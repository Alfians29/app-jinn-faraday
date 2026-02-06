'use client';

import { useState, useEffect, useCallback } from 'react';

const POLLING_INTERVAL = 15 * 60 * 1000; // 15 minutes - quota optimization
const API_ENDPOINT = '/api/live-status';

interface LiveChannelInfo {
  isLive: boolean;
  videoId?: string;
  title?: string;
  thumbnail?: string;
  error?: string | boolean;
}

interface LiveChannels {
  [channelId: string]: LiveChannelInfo;
}

interface UseLiveStatusReturn {
  liveChannels: LiveChannels;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isChannelLive: (channelId: string | undefined) => boolean;
  getLiveInfo: (channelId: string) => LiveChannelInfo;
}

export function useLiveStatus(
  channelIds: (string | undefined)[] = [],
): UseLiveStatusReturn {
  const [liveChannels, setLiveChannels] = useState<LiveChannels>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveStatus = useCallback(async () => {
    // 🔧 MOCK MODE: Set to true to show all channels as "LIVE" for testing
    const MOCK_ALL_LIVE = false;

    if (MOCK_ALL_LIVE) {
      const validChannelIds = channelIds.filter((id): id is string => !!id);
      const mockData: LiveChannels = {};
      validChannelIds.forEach((id) => {
        mockData[id] = {
          isLive: true,
          title: 'Mock Live Stream',
          videoId: 'mock-video-id',
        };
      });
      setLiveChannels(mockData);
      setIsLoading(false);
      return;
    }

    if (!channelIds || channelIds.length === 0) {
      return;
    }

    // Filter out null/undefined channel IDs
    const validChannelIds = channelIds.filter((id): id is string => !!id);
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
      setError(err instanceof Error ? err.message : 'Unknown error');
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

  const isChannelLive = useCallback(
    (channelId: string | undefined): boolean => {
      if (!channelId) return false;
      return liveChannels[channelId]?.isLive || false;
    },
    [liveChannels],
  );

  const getLiveInfo = useCallback(
    (channelId: string): LiveChannelInfo => {
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
