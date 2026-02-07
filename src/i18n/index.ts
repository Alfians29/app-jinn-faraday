import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Hero Section
      hero: {
        story: 'STORY',
        of: 'OF',
        jinn: 'JINN',
        faraday: 'FARADAY',
      },
      // Navigation
      nav: {
        home: 'HOME',
        story: 'STORY',
        family: 'FAMILY',
        servers: 'SERVERS',
      },
      // Story Section - SOA
      soa: {
        title: 'Two Wheels,',
        subtitle: 'One Brotherhood',
        description1:
          "It all started with Jinn Faraday and a few of his friends who often hung out at Ron's gas station in downtown Los Santos. At first, it was just a place to hang out, make some money, and spend the night talking about motorcycles and the tough life on the streets. From that hangout spot, Jinn and his friends slowly built a motorcycle club that eventually became known as SOA. Until finally they were kicked out and forced to leave, as if the city that had once been their home was pushing them out.",
        description2:
          'Over time, their activities on the streets became more violent. SOA began to get involved in territorial conflicts with other gangs, clashes on the streets became commonplace, and some members began to get involved in the black market in order to survive. From gang wars to drug trafficking, it all became part of their lives. The name SOA became increasingly well-known, not just as a motorcycle club, but as a group ready to fight back if their territory or business was threatened.',
        description3:
          "As tensions escalated in the city, Jinn and his crew chose to temporarily retreat and move to an old motel in Sandy Shores, a desert area far from the hustle and bustle. There, they regrouped, strengthened their bonds, and slowly rebuilt their influence. Eventually, when the name SOA resurfaced in Los Santos, people knew that the motorcycle gang founded by Jinn Faraday and his crew wasn't just back, they had returned with a force that made many choose to back down rather than seek trouble.",
      },
      // Story Section - ALLSTAR
      allstar: {
        title: 'North Crown,',
        subtitle: 'Street Authority',
        description1:
          'After his journey with SOA ended, Jinn Faraday finally found a new home with ALLSTAR, a car club whose name continues to rise in the northern region of Los Santos. Although ALLSTAR is known as a car and street racing community, Jinn joined not because of his driving skills, but because of his fighting and weapon skills, something that quickly made him well known within the group. In every major conflict involving ALLSTAR, Jinn is often at the forefront when things get chaotic.',
        description2:
          'In downtown Los Santos, ALLSTAR is known to the public for their large garage, which is always bustling with modified cars and customers from all walks of life. From the outside, it looks like a successful automotive business owned by a regular car community. But behind the garage and racing activities, ALLSTAR runs a shady business that makes their name even more feared on the streets, including a drug distribution network that gives them significant influence in the city.',
        description3:
          'Therefore, ALLSTAR is not just known as a car club but also as a dangerous gang when conflicts arise. Many other groups choose to back down rather than confront them directly, especially when their best members take to the streets. Now, Jinn and the ALLSTAR members are moving from a large mansion in the northern part of the city, and everyone in Los Santos knows one thing: behind their fast cars and luxurious lifestyle, ALLSTAR is a group that few dare to confront directly.',
      },
      // Family Section
      family: {
        title1: 'The Faraday',
        title2: 'Family',
        description:
          'Blood is thicker than water in Los Santos. Meet the Faraday family, united by loyalty and driven by ambition.',
        roles: {
          father: 'Father',
          mainCharacter: 'Main Character',
          wife: 'Wife',
          sister: 'Sister',
          daughter: 'Daughter',
          nephew: 'Nephew',
          children: 'Childrens',
          brother: 'Brother',
          siblings: 'Siblings',
          missing: 'MISSING PERSON',
          bodyguard: 'Bodyguard',
          sweetheart: 'Sweetheart',
        },
      },
      // Servers Section
      servers: {
        title: 'SERVERS',
        description:
          'The roleplay servers where Jinn Faraday builds his story and legacy.',
        platform: 'GTA V Roleplay',
        soi: {
          name: 'State of Indonesia',
          description:
            'The server where Jinn started his journey with SOA motorcycle club and built his reputation on the streets of Los Santos.',
        },
        ime: {
          name: 'IME Roleplay',
          description:
            'The server where Jinn continues his story with ALLSTAR car club, dominating the northern streets with style and power.',
        },
      },
      // Quote Section
      quote: {
        text: 'Everyone loves war, but not everyone can accept defeat.',
        author: 'Jinn Faraday',
      },
      // Footer
      footer: {
        disclaimer:
          'This is a fan-made website for entertainment purposes only.',
        notAffiliated:
          'Not affiliated with Rockstar Games or Take-Two Interactive.',
        roleplay: 'All characters and stories are fictional roleplay content.',
      },
    },
  },
  id: {
    translation: {
      // Hero Section
      hero: {
        story: 'KISAH',
        of: '',
        jinn: 'JINN',
        faraday: 'FARADAY',
      },
      // Navigation
      nav: {
        home: 'BERANDA',
        story: 'CERITA',
        family: 'KELUARGA',
        servers: 'SERVER',
      },
      // Story Section - SOA
      soa: {
        title: 'Dua Roda,',
        subtitle: 'Satu Persaudaraan',
        description1:
          'Semua bermula dari Jinn Faraday dan beberapa temannya yang sering nongkrong di pom bensin Ron di pusat kota Los Santos. Awalnya, tempat itu hanya untuk berkumpul, mencari uang, dan menghabiskan malam sambil membicarakan motor dan kehidupan jalanan yang keras. Dari tempat nongkrong itu, Jinn dan teman-temannya perlahan membangun klub motor yang akhirnya dikenal sebagai SOA. Hingga akhirnya mereka diusir dan dipaksa pergi, seolah kota yang pernah menjadi rumah mereka mendorong mereka keluar.',
        description2:
          'Seiring waktu, aktivitas mereka di jalanan menjadi lebih keras. SOA mulai terlibat dalam konflik wilayah dengan geng lain, bentrokan di jalanan menjadi hal biasa, dan beberapa anggota mulai terlibat dalam pasar gelap demi bertahan hidup. Dari perang geng hingga perdagangan narkoba, semua menjadi bagian dari kehidupan mereka. Nama SOA semakin dikenal, bukan hanya sebagai klub motor, tetapi sebagai kelompok yang siap melawan jika wilayah atau bisnis mereka terancam.',
        description3:
          'Saat ketegangan meningkat di kota, Jinn dan krunya memilih untuk mundur sementara dan pindah ke motel tua di Sandy Shores, daerah gurun yang jauh dari keramaian. Di sana, mereka berkumpul kembali, mempererat ikatan, dan perlahan membangun kembali pengaruh mereka. Akhirnya, ketika nama SOA muncul kembali di Los Santos, orang-orang tahu bahwa geng motor yang didirikan Jinn Faraday dan krunya bukan hanya kembali, mereka kembali dengan kekuatan yang membuat banyak orang memilih mundur daripada mencari masalah.',
      },
      // Story Section - ALLSTAR
      allstar: {
        title: 'Mahkota Utara,',
        subtitle: 'Penguasa Jalanan',
        description1:
          'Setelah perjalanannya dengan SOA berakhir, Jinn Faraday akhirnya menemukan rumah baru bersama ALLSTAR, klub mobil yang namanya terus naik di wilayah utara Los Santos. Meskipun ALLSTAR dikenal sebagai komunitas mobil dan balap jalanan, Jinn bergabung bukan karena kemampuan menyetirnya, tetapi karena kemampuan bertarung dan senjatanya, sesuatu yang dengan cepat membuatnya terkenal di dalam grup. Dalam setiap konflik besar yang melibatkan ALLSTAR, Jinn sering berada di garis depan ketika keadaan menjadi kacau.',
        description2:
          'Di pusat kota Los Santos, ALLSTAR dikenal publik karena garasi besar mereka, yang selalu ramai dengan mobil modifikasi dan pelanggan dari berbagai kalangan. Dari luar, terlihat seperti bisnis otomotif sukses yang dimiliki komunitas mobil biasa. Tetapi di balik garasi dan aktivitas balap, ALLSTAR menjalankan bisnis gelap yang membuat nama mereka semakin ditakuti di jalanan, termasuk jaringan distribusi narkoba yang memberi mereka pengaruh signifikan di kota.',
        description3:
          'Oleh karena itu, ALLSTAR tidak hanya dikenal sebagai klub mobil tetapi juga sebagai geng berbahaya ketika konflik muncul. Banyak kelompok lain memilih mundur daripada berhadapan langsung dengan mereka, terutama ketika anggota terbaik mereka turun ke jalanan. Sekarang, Jinn dan anggota ALLSTAR bergerak dari mansion besar di bagian utara kota, dan semua orang di Los Santos tahu satu hal: di balik mobil cepat dan gaya hidup mewah mereka, ALLSTAR adalah kelompok yang sedikit orang berani hadapi langsung.',
      },
      // Family Section
      family: {
        title1: 'Keluarga',
        title2: 'Faraday',
        description:
          'Darah lebih kental dari air di Los Santos. Kenali keluarga Faraday, bersatu oleh kesetiaan dan didorong oleh ambisi.',
        roles: {
          father: 'Ayah',
          mainCharacter: 'Karakter Utama',
          wife: 'Istri',
          sister: 'Saudari',
          daughter: 'Anak Perempuan',
          nephew: 'Keponakan',
          children: 'Anak-anak',
          brother: 'Saudara',
          siblings: 'Saudara-saudara',
          missing: 'ORANG HILANG',
          bodyguard: 'Pengawal',
          sweetheart: 'Kesayangan',
        },
      },
      // Servers Section
      servers: {
        title: 'SERVER',
        description:
          'Server roleplay tempat Jinn Faraday membangun cerita dan warisannya.',
        platform: 'GTA V Roleplay',
        soi: {
          name: 'State of Indonesia',
          description:
            'Server tempat Jinn memulai perjalanannya bersama klub motor SOA dan membangun reputasinya di jalanan Los Santos.',
        },
        ime: {
          name: 'IME Roleplay',
          description:
            'Server tempat Jinn melanjutkan ceritanya bersama klub mobil ALLSTAR, mendominasi jalanan utara dengan gaya dan kekuatan.',
        },
      },
      // Quote Section
      quote: {
        text: 'Semua orang suka perang, tapi tidak semua orang bisa menerima kekalahan.',
        author: 'Jinn Faraday',
      },
      // Footer
      footer: {
        disclaimer:
          'Ini adalah website buatan viewer untuk tujuan hiburan saja.',
        notAffiliated:
          'Tidak berafiliasi dengan Rockstar Games atau Take-Two Interactive.',
        roleplay: 'Semua karakter dan cerita adalah konten roleplay fiksi.',
      },
    },
  },
};

// Get saved language (client-side only)
const getSavedLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'en';
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getSavedLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
