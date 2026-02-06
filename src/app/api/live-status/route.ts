import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const CACHE_KEY = 'youtube-live-status';
const CACHE_TTL_SECONDS = 1800; // 30 minutes

// Initialize Redis client only if env vars are available
const redis =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

// Track which API key index to use (persists during function lifecycle)
let currentKeyIndex = 0;

/**
 * Get API keys from environment variable
 * Supports multiple keys separated by comma
 */
function getApiKeys(): string[] {
  const keys = process.env.YOUTUBE_API_KEY || '';
  return keys
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
}

interface YouTubeError {
  error?: {
    errors?: Array<{ reason: string }>;
  };
}

/**
 * Check if error is quota exceeded
 */
function isQuotaError(data: YouTubeError): boolean {
  if (data.error) {
    const reason = data.error.errors?.[0]?.reason;
    return reason === 'quotaExceeded' || reason === 'dailyLimitExceeded';
  }
  return false;
}

interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails?: { default?: { url: string } };
  };
}

interface YouTubeSearchResponse {
  items?: YouTubeSearchItem[];
  error?: {
    errors?: Array<{ reason: string }>;
  };
}

/**
 * Check live status for a single channel using search.list
 */
async function checkChannelLive(
  channelId: string,
  apiKey: string,
): Promise<{ data: YouTubeSearchResponse; isQuotaError: boolean }> {
  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
  searchUrl.searchParams.set('part', 'snippet');
  searchUrl.searchParams.set('channelId', channelId);
  searchUrl.searchParams.set('type', 'video');
  searchUrl.searchParams.set('eventType', 'live');
  searchUrl.searchParams.set('key', apiKey);
  searchUrl.searchParams.set('maxResults', '1');

  const response = await fetch(searchUrl.toString());
  const data = await response.json();

  return { data, isQuotaError: isQuotaError(data) };
}

interface CacheData {
  liveChannels: Record<string, unknown>;
  timestamp: number;
  quotaUsed?: number;
  apiKeyUsed?: number;
  totalApiKeys?: number;
  keysExhausted?: boolean;
}

export async function GET(request: NextRequest) {
  const apiKeys = getApiKeys();

  if (apiKeys.length === 0) {
    return NextResponse.json(
      {
        error: 'YouTube API key not configured',
        liveChannels: {},
      },
      { status: 500 },
    );
  }

  // Check Redis cache
  const now = Date.now();
  if (redis) {
    try {
      const cachedData = await redis.get<CacheData>(CACHE_KEY);
      if (cachedData) {
        return NextResponse.json({
          ...cachedData,
          cached: true,
          cacheAge: cachedData.timestamp
            ? Math.round((now - cachedData.timestamp) / 1000)
            : 0,
        });
      }
    } catch (cacheError) {
      console.error('Redis cache read error:', cacheError);
      // Continue without cache if Redis fails
    }
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const channelIdsParam = searchParams.get('channelIds');
    const channelIds = channelIdsParam
      ? channelIdsParam.split(',').filter((id) => id)
      : [];

    if (channelIds.length === 0) {
      return NextResponse.json({
        liveChannels: {},
        message: 'No channel IDs provided',
      });
    }

    const liveChannels: Record<
      string,
      {
        isLive: boolean;
        videoId?: string;
        title?: string;
        thumbnail?: string;
        error?: string | boolean;
      }
    > = {};
    let keysExhausted = false;
    const usedKeyIndex = currentKeyIndex;

    // Check each channel
    for (const channelId of channelIds) {
      if (keysExhausted) {
        liveChannels[channelId] = { isLive: false, error: 'quota_exhausted' };
        continue;
      }

      let success = false;
      let attempts = 0;

      // Try with current key, rotate if quota exceeded
      while (!success && attempts < apiKeys.length) {
        const apiKey = apiKeys[currentKeyIndex];

        try {
          const { data, isQuotaError: quotaError } = await checkChannelLive(
            channelId,
            apiKey,
          );

          if (quotaError) {
            // Quota exceeded, try next key
            console.log(
              `API key ${currentKeyIndex + 1} quota exceeded, rotating...`,
            );
            currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
            attempts++;

            // If we've tried all keys, mark as exhausted
            if (attempts >= apiKeys.length) {
              keysExhausted = true;
              liveChannels[channelId] = {
                isLive: false,
                error: 'quota_exhausted',
              };
            }
          } else if (data.items && data.items.length > 0) {
            // Channel is live!
            liveChannels[channelId] = {
              isLive: true,
              videoId: data.items[0].id.videoId,
              title: data.items[0].snippet.title,
              thumbnail: data.items[0].snippet.thumbnails?.default?.url,
            };
            success = true;
          } else {
            // Channel is not live
            liveChannels[channelId] = { isLive: false };
            success = true;
          }
        } catch (err) {
          console.error(`Error checking channel ${channelId}:`, err);
          liveChannels[channelId] = { isLive: false, error: true };
          success = true; // Move on to next channel
        }
      }
    }

    // Estimate quota used (100 units per search call)
    const quotaUsed = channelIds.length * 100;

    // Update Redis cache
    const cacheData: CacheData = {
      liveChannels,
      timestamp: now,
      quotaUsed,
      apiKeyUsed: usedKeyIndex + 1,
      totalApiKeys: apiKeys.length,
      keysExhausted,
    };

    if (redis) {
      try {
        await redis.set(CACHE_KEY, cacheData, { ex: CACHE_TTL_SECONDS });
      } catch (cacheError) {
        console.error('Redis cache write error:', cacheError);
        // Continue even if cache write fails
      }
    }

    return NextResponse.json({
      liveChannels,
      cached: false,
      timestamp: now,
      quotaUsed,
      apiKeyUsed: usedKeyIndex + 1,
      totalApiKeys: apiKeys.length,
      keysExhausted,
    });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch live status',
        liveChannels: {},
      },
      { status: 500 },
    );
  }
}
