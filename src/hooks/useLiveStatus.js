import { useState, useEffect, useCallback } from 'react';

const POLLING_INTERVAL = 3 * 60 * 1000; // 3 minutes
const API_ENDPOINT = '/api/live-status';

/**
 * Hook to track YouTube live status for family members
 * @param {string[]} channelIds - Array of YouTube channel IDs to check
 * @returns {{ liveChannels: Object, isLoading: boolean, error: string|null, refetch: Function }}
 */
export function useLiveStatus(channelIds = []) {
  const [liveChannels, setLiveChannels] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLiveStatus = useCallback(async () => {
    if (!channelIds || channelIds.length === 0) {
      return;
    }

    // Filter out null/undefined channel IDs
    const validChannelIds = channelIds.filter((id) => id);
    if (validChannelIds.length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = `${API_ENDPOINT}?channelIds=${validChannelIds.join(',')}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.liveChannels) {
        setLiveChannels(data.liveChannels);
      }
    } catch (err) {
      console.error('Error fetching live status:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [channelIds]);

  // Initial fetch
  useEffect(() => {
    fetchLiveStatus();
  }, [fetchLiveStatus]);

  // Polling
  useEffect(() => {
    const interval = setInterval(fetchLiveStatus, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchLiveStatus]);

  /**
   * Check if a specific channel is live
   * @param {string} channelId
   * @returns {boolean}
   */
  const isChannelLive = useCallback(
    (channelId) => {
      return liveChannels[channelId]?.isLive || false;
    },
    [liveChannels],
  );

  /**
   * Get live stream info for a channel
   * @param {string} channelId
   * @returns {{ isLive: boolean, videoId?: string, title?: string }}
   */
  const getLiveInfo = useCallback(
    (channelId) => {
      return liveChannels[channelId] || { isLive: false };
    },
    [liveChannels],
  );

  return {
    liveChannels,
    isLoading,
    error,
    refetch: fetchLiveStatus,
    isChannelLive,
    getLiveInfo,
  };
}

export default useLiveStatus;
