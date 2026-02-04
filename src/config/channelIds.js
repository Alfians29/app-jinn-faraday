// Channel ID mapping for all family members
// To get Channel ID: Go to YouTube channel -> View Page Source -> search for "channelId"
// Or use: https://commentpicker.com/youtube-channel-id.php

export const CHANNEL_MAP = {
  // Main Characters
  farisauliaarasy: { channelId: null, name: 'Jinn Faraday' },
  adelkharisma4184: { channelId: null, name: 'Adel Faraday' },

  // Easter Egg
  sMagic: { channelId: null, name: 'Seno Parulian' },

  // Missing & Bodyguard
  chunchun: { channelId: null, name: 'Abah Nanang' },
  fathirazri525: { channelId: null, name: 'Spencer' },

  // Brother
  fazahandiko: { channelId: null, name: 'Japor' },

  // Sisters 1
  Urfavchuya: { channelId: null, name: 'Chuya' },
  celiazu: { channelId: null, name: 'Ayana' },
  nonamonikhaa: { channelId: null, name: 'Mychia' },

  // Sisters 2
  Mizuuu: { channelId: null, name: 'Mizu' },
  pookiemiaw: { channelId: null, name: 'Yuri' },
  iniinaaaaa: { channelId: null, name: 'Aina' },
  realovvi: { channelId: null, name: 'Ovvi' },
  SeighSagee: { channelId: null, name: 'Sage' },
  haeraabc: { channelId: null, name: 'Lora' },

  // Daughters
  NandaKazesawa: { channelId: null, name: 'Mizuki' },
  cewlsii: { channelId: null, name: 'Marina' },
  Sheyuniies: { channelId: null, name: 'Bee' },
  AmeyaKirei: { channelId: null, name: 'Ayaya' },

  // Nephews
  NattyNaaa: { channelId: null, name: 'Joanne' },
};

// Helper to get YouTube handle from URL
export function extractYouTubeHandle(url) {
  if (!url) return null;
  const match = url.match(/youtube\.com\/@([^\/\?]+)/);
  return match ? match[1] : null;
}

// Get all channel IDs that are configured
export function getConfiguredChannelIds() {
  return Object.entries(CHANNEL_MAP)
    .filter(([_, data]) => data.channelId)
    .map(([handle, data]) => ({
      handle,
      channelId: data.channelId,
      name: data.name,
    }));
}
