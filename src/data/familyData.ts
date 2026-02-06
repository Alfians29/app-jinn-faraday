// Easter Egg data
export const EASTER_EGG = {
  wife: {
    name: 'Seno Parulian',
    role: 'Sweetheart',
    image: '/familytree/seno.png',
    youtube: 'https://www.youtube.com/@sMagic',
    channelId: 'UC1MvpcTErN-kPtUHQBqvjcQ',
  },
};

// Family member type
interface FamilyMember {
  name: string;
  role: string;
  image: string;
  youtube?: string;
  channelId?: string;
  status?: string;
}

// Family data
export const FAMILY: {
  missingPerson: FamilyMember;
  bodyguard: FamilyMember;
  mainCharacter: FamilyMember;
  wife: FamilyMember;
  brother: FamilyMember;
  sisters1: FamilyMember[];
  sisters2: FamilyMember[];
  daughters: FamilyMember[];
  nephews: FamilyMember[];
} = {
  missingPerson: {
    name: 'Abah Nanang',
    role: 'Father',
    image: '/familytree/nanang.png',
    youtube: 'https://www.youtube.com/@chunchun',
    channelId: 'UCOySEdoXg4gH01RLRV_TDxQ',
    status: 'missing',
  },
  bodyguard: {
    name: 'Spencer',
    role: 'Bodyguard',
    image: '/familytree/spencer.png',
    youtube: 'https://www.youtube.com/@fathirazri525',
    channelId: 'UC3_zArlVABG4chwDN2pxs6Q',
  },
  mainCharacter: {
    name: 'Jinn Faraday',
    role: 'Main Character',
    image: '/familytree/jinn.png',
    youtube: 'https://www.youtube.com/@farisauliaarasy',
    channelId: 'UCTdv2iH9Qpx3cdn0fpOd7HA',
  },
  wife: {
    name: 'Adel Faraday',
    role: 'Wife',
    image: '/familytree/adel.png',
    youtube: 'https://www.youtube.com/@adelkharisma4184',
    channelId: 'UCXy5DENxtbkkL-Al4R29k7Q',
  },
  brother: {
    name: 'Japor',
    role: 'Brother',
    image: '/familytree/japor.png',
    youtube: 'https://www.youtube.com/@fazahandiko',
    channelId: 'UC4x1GxFYybjNiod_1MPe1Uw',
  },
  sisters1: [
    {
      name: 'Chuya',
      role: 'Sister',
      image: '/familytree/chuya.png',
      youtube: 'https://www.youtube.com/@Urfavchuya',
      channelId: 'UCR1hX_cR7jMLbWIXoinOAUg',
    },
    {
      name: 'Ayana',
      role: 'Sister',
      image: '/familytree/ayana.png',
      youtube: 'https://www.youtube.com/@celiazu',
      channelId: 'UCegi1a82IRs8p54uLgxw9yg',
    },
    {
      name: 'Mychia',
      role: 'Sister',
      image: '/familytree/mychia.png',
      youtube: 'https://www.youtube.com/@nonamonikhaa',
      channelId: 'UCNwNBld8V_FNE8Lpze1EWvg',
    },
  ],
  sisters2: [
    {
      name: 'Mizu',
      role: 'Sister',
      image: '/familytree/mizu.png',
      youtube: 'https://www.youtube.com/@Mizuuu',
      channelId: 'UCumJc5iI5rribEGLFV0djWg',
    },
    {
      name: 'Yuri',
      role: 'Sister',
      image: '/familytree/yuri.png',
      youtube: 'https://www.youtube.com/@pookiemiaw',
      channelId: 'UCX7pfcXtCKBL0e8iG8bxQrA',
    },
    {
      name: 'Aina',
      role: 'Sister',
      image: '/familytree/aina.png',
      youtube: 'https://www.youtube.com/@iniinaaaaa',
      channelId: 'UCTjyH8SBV_1z5DO0f1wU1pw',
    },
    {
      name: 'Ovvi',
      role: 'Sister',
      image: '/familytree/ovvi.png',
      youtube: 'https://www.youtube.com/@realovvi',
      channelId: 'UCNnx4eNdxr92yM0rYToeh0Q',
    },
    {
      name: 'Sage',
      role: 'Sister',
      image: '/familytree/sage.png',
      youtube: 'https://www.youtube.com/@SeighSagee',
      channelId: 'UCmijGZLpwIKtcZiztNUCMEA',
    },
    {
      name: 'Lora',
      role: 'Sister',
      image: '/familytree/lora.png',
      youtube: 'https://www.youtube.com/@haeraabc',
      channelId: 'UCALTxpedfAmFkTxmysbx4Wg',
    },
  ],
  daughters: [
    {
      name: 'Mizuki',
      role: 'Daughter',
      image: '/familytree/mizuki.png',
      youtube: 'https://www.youtube.com/@NandaKazesawa',
      channelId: 'UCZpXRpgSKSFZkj6IU5yvoZA',
    },
    {
      name: 'Marina',
      role: 'Daughter',
      image: '/familytree/marina.png',
      youtube: 'https://www.youtube.com/@cewlsii',
      channelId: 'UCSVLMKIA8svnwcLCtIsrw1Q',
    },
    {
      name: 'Bee',
      role: 'Daughter',
      image: '/familytree/bee.png',
      youtube: 'https://www.youtube.com/@Sheyuniies',
      channelId: 'UC5xbsfqVUxfU_Js8NJoyLXg',
    },
    {
      name: 'Ayaya',
      role: 'Daughter',
      image: '/familytree/ayaya.png',
      youtube: 'https://www.youtube.com/@AmeyaKirei',
      channelId: 'UCXt4BpMOaSqpcU4GOd--Nyw',
    },
  ],
  nephews: [
    {
      name: 'Joanne',
      role: 'Nephew',
      image: '/familytree/joanne.png',
      youtube: 'https://www.youtube.com/@NattyNaaa',
      channelId: 'UCZiD4-hD-_vxlshKT8OSJXA',
    },
  ],
};
