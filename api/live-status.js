// Vercel Serverless Function for YouTube Live Status
// OPTIMIZED: Uses channels.list + videos.list (much cheaper than search.list)
// Cost: ~30 units per check vs ~2000 units with search.list = 66x savings!

const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes cache (can afford more frequent checks now)

let cache = {
  data: null,
  timestamp: 0,
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // Edge cache for 15 min, serve stale for up to 30 min while revalidating
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');

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

    // Initialize all channels as not live
    channelIds.forEach((id) => {
      liveChannels[id] = { isLive: false };
    });

    // Step 1: Get all channels' upload playlist IDs in ONE call (~3 units)
    const channelsUrl = new URL(
      'https://www.googleapis.com/youtube/v3/channels',
    );
    channelsUrl.searchParams.set('part', 'contentDetails');
    channelsUrl.searchParams.set('id', channelIds.join(','));
    channelsUrl.searchParams.set('key', apiKey);
    channelsUrl.searchParams.set('maxResults', '50');

    const channelsResponse = await fetch(channelsUrl.toString());
    const channelsData = await channelsResponse.json();

    if (!channelsData.items || channelsData.items.length === 0) {
      return res.status(200).json({
        liveChannels,
        cached: false,
        timestamp: now,
        quotaUsed: 3,
      });
    }

    // Map channel ID to uploads playlist ID
    const channelToPlaylist = {};
    for (const channel of channelsData.items) {
      const uploadsPlaylistId =
        channel.contentDetails?.relatedPlaylists?.uploads;
      if (uploadsPlaylistId) {
        channelToPlaylist[channel.id] = uploadsPlaylistId;
      }
    }

    // Step 2: Get the most recent video from each channel's uploads playlist
    // We'll batch these requests to minimize API calls
    const videoIds = [];
    const videoToChannel = {};

    // Fetch recent videos from each playlist (~1 unit per call)
    for (const [channelId, playlistId] of Object.entries(channelToPlaylist)) {
      try {
        const playlistUrl = new URL(
          'https://www.googleapis.com/youtube/v3/playlistItems',
        );
        playlistUrl.searchParams.set('part', 'contentDetails');
        playlistUrl.searchParams.set('playlistId', playlistId);
        playlistUrl.searchParams.set('key', apiKey);
        playlistUrl.searchParams.set('maxResults', '1'); // Only get most recent video

        const playlistResponse = await fetch(playlistUrl.toString());
        const playlistData = await playlistResponse.json();

        if (playlistData.items && playlistData.items.length > 0) {
          const videoId = playlistData.items[0].contentDetails.videoId;
          videoIds.push(videoId);
          videoToChannel[videoId] = channelId;
        }
      } catch (err) {
        console.error(`Error fetching playlist for channel ${channelId}:`, err);
      }
    }

    // Step 3: Check all videos for live streaming status in ONE call (~3 units)
    if (videoIds.length > 0) {
      const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
      videosUrl.searchParams.set('part', 'liveStreamingDetails,snippet');
      videosUrl.searchParams.set('id', videoIds.join(','));
      videosUrl.searchParams.set('key', apiKey);

      const videosResponse = await fetch(videosUrl.toString());
      const videosData = await videosResponse.json();

      if (videosData.items) {
        for (const video of videosData.items) {
          const channelId = videoToChannel[video.id];
          const liveDetails = video.liveStreamingDetails;

          // Check if currently live (has actualStartTime but no actualEndTime)
          if (
            liveDetails &&
            liveDetails.actualStartTime &&
            !liveDetails.actualEndTime
          ) {
            liveChannels[channelId] = {
              isLive: true,
              videoId: video.id,
              title: video.snippet?.title,
              thumbnail: video.snippet?.thumbnails?.default?.url,
            };
          }
        }
      }
    }

    // Approximate quota used: 3 (channels) + 20 (playlists) + 3 (videos) = ~26 units
    const quotaUsed = 3 + Object.keys(channelToPlaylist).length + 3;

    // Update cache
    cache = {
      data: { liveChannels, timestamp: now, quotaUsed },
      timestamp: now,
    };

    return res.status(200).json({
      liveChannels,
      cached: false,
      timestamp: now,
      quotaUsed,
    });
  } catch (error) {
    console.error('YouTube API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch live status',
      liveChannels: {},
    });
  }
}
