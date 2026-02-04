// Vercel Serverless Function for YouTube Live Status
// FEATURES:
// - Uses search.list for reliable live detection
// - Auto-rotates API keys when quota exceeded
// - 30 minute cache for quota efficiency

const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes cache

let cache = {
  data: null,
  timestamp: 0,
};

// Track which API key index to use (persists during function lifecycle)
let currentKeyIndex = 0;

/**
 * Get API keys from environment variable
 * Supports multiple keys separated by comma
 */
function getApiKeys() {
  const keys = process.env.YOUTUBE_API_KEY || '';
  return keys
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
}

/**
 * Check if error is quota exceeded
 */
function isQuotaError(data) {
  if (data.error) {
    const reason = data.error.errors?.[0]?.reason;
    return reason === 'quotaExceeded' || reason === 'dailyLimitExceeded';
  }
  return false;
}

/**
 * Check live status for a single channel using search.list
 */
async function checkChannelLive(channelId, apiKey) {
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

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // Edge cache for 30 min, serve stale for up to 1 hour while revalidating
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKeys = getApiKeys();

  if (apiKeys.length === 0) {
    return res.status(500).json({
      error: 'YouTube API key not configured',
      liveChannels: {},
    });
  }

  // Check cache
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_DURATION_MS) {
    return res.status(200).json({
      ...cache.data,
      cached: true,
      cacheAge: Math.round((now - cache.timestamp) / 1000),
    });
  }

  try {
    const channelIds = req.query.channelIds
      ? req.query.channelIds.split(',').filter((id) => id)
      : [];

    if (channelIds.length === 0) {
      return res.status(200).json({
        liveChannels: {},
        message: 'No channel IDs provided',
      });
    }

    const liveChannels = {};
    let keysExhausted = false;
    let usedKeyIndex = currentKeyIndex;

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

    // Update cache
    cache = {
      data: {
        liveChannels,
        timestamp: now,
        quotaUsed,
        apiKeyUsed: usedKeyIndex + 1,
        totalApiKeys: apiKeys.length,
        keysExhausted,
      },
      timestamp: now,
    };

    return res.status(200).json({
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
    return res.status(500).json({
      error: 'Failed to fetch live status',
      liveChannels: {},
    });
  }
}
