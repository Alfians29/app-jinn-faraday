// Vercel Serverless Function for YouTube Live Status
// This checks if any of the configured YouTube channels are currently live streaming
// OPTIMIZED: Extended caching to minimize API quota usage

const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes cache (was 3 min)

let cache = {
  data: null,
  timestamp: 0,
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // Edge cache for 30 min, serve stale for up to 1 hour while revalidating
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
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
    // Get channel IDs from query or use all configured ones
    const channelIds = req.query.channelIds
      ? req.query.channelIds.split(',')
      : [];

    if (channelIds.length === 0) {
      return res.status(200).json({
        liveChannels: {},
        message: 'No channel IDs provided',
      });
    }

    // YouTube API: Search for live broadcasts
    const liveChannels = {};

    // Batch channels (max 50 per request)
    const batchSize = 50;
    for (let i = 0; i < channelIds.length; i += batchSize) {
      const batch = channelIds.slice(i, i + batchSize);

      // Search for live streams from these channels
      const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
      searchUrl.searchParams.set('part', 'snippet');
      searchUrl.searchParams.set('channelId', batch.join(','));
      searchUrl.searchParams.set('type', 'video');
      searchUrl.searchParams.set('eventType', 'live');
      searchUrl.searchParams.set('key', apiKey);
      searchUrl.searchParams.set('maxResults', '50');

      // For each channel, check individually (more accurate)
      for (const channelId of batch) {
        const channelSearchUrl = new URL(
          'https://www.googleapis.com/youtube/v3/search',
        );
        channelSearchUrl.searchParams.set('part', 'snippet');
        channelSearchUrl.searchParams.set('channelId', channelId);
        channelSearchUrl.searchParams.set('type', 'video');
        channelSearchUrl.searchParams.set('eventType', 'live');
        channelSearchUrl.searchParams.set('key', apiKey);
        channelSearchUrl.searchParams.set('maxResults', '1');

        try {
          const response = await fetch(channelSearchUrl.toString());
          const data = await response.json();

          if (data.items && data.items.length > 0) {
            liveChannels[channelId] = {
              isLive: true,
              videoId: data.items[0].id.videoId,
              title: data.items[0].snippet.title,
              thumbnail: data.items[0].snippet.thumbnails?.default?.url,
            };
          } else {
            liveChannels[channelId] = { isLive: false };
          }
        } catch (err) {
          liveChannels[channelId] = { isLive: false, error: true };
        }
      }
    }

    // Update cache
    cache = {
      data: { liveChannels, timestamp: now },
      timestamp: now,
    };

    return res.status(200).json({
      liveChannels,
      cached: false,
      timestamp: now,
    });
  } catch (error) {
    console.error('YouTube API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch live status',
      liveChannels: {},
    });
  }
}
