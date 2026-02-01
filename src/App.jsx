import React, { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import 'remixicon/fonts/remixicon.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animated Particles Component
const Particles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 25; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.5 + 0.1,
          color:
            Math.random() > 0.7
              ? 'yellow'
              : Math.random() > 0.5
                ? 'orange'
                : 'white',
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className='absolute rounded-full animate-float'
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor:
              particle.color === 'yellow'
                ? '#EAB308'
                : particle.color === 'orange'
                  ? '#F97316'
                  : 'rgba(255,255,255,0.5)',
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow:
              particle.color === 'yellow'
                ? '0 0 10px #EAB308'
                : particle.color === 'orange'
                  ? '0 0 8px #F97316'
                  : '0 0 5px rgba(255,255,255,0.3)',
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: var(--opacity, 0.3);
          }
          25% {
            transform: translateY(-30px) translateX(10px);
            opacity: calc(var(--opacity, 0.3) * 1.5);
          }
          50% {
            transform: translateY(-15px) translateX(-15px);
            opacity: var(--opacity, 0.3);
          }
          75% {
            transform: translateY(-40px) translateX(5px);
            opacity: calc(var(--opacity, 0.3) * 0.8);
          }
        }
      `}</style>
    </div>
  );
};

// Character data for switching
const CHARACTERS = [
  {
    id: 1,
    name: 'SOA',
    title: 'Two Wheels,',
    subtitle: 'One Brotherhood',
    image: './arcsoa.png',
    description1:
      "It all started with Jinn Faraday and a few of his friends who often hung out at Ron's gas station in downtown Los Santos. At first, it was just a place to hang out, make some money, and spend the night talking about motorcycles and the tough life on the streets. From that hangout spot, Jinn and his friends slowly built a motorcycle club that eventually became known as SOA. Until finally they were kicked out and forced to leave, as if the city that had once been their home was pushing them out.",
    description2:
      'Over time, their activities on the streets became more violent. SOA began to get involved in territorial conflicts with other gangs, clashes on the streets became commonplace, and some members began to get involved in the black market in order to survive. From gang wars to drug trafficking, it all became part of their lives. The name SOA became increasingly well-known, not just as a motorcycle club, but as a group ready to fight back if their territory or business was threatened.',
    description3:
      "As tensions escalated in the city, Jinn and his crew chose to temporarily retreat and move to an old motel in Sandy Shores, a desert area far from the hustle and bustle. There, they regrouped, strengthened their bonds, and slowly rebuilt their influence. Eventually, when the name SOA resurfaced in Los Santos, people knew that the motorcycle gang founded by Jinn Faraday and his crew wasn't just back, they had returned with a force that made many choose to back down rather than seek trouble.",
  },
  {
    id: 2,
    name: 'ALLSTAR',
    title: 'North Crown,',
    subtitle: 'Street Authority',
    image: './arcas.png',
    description1:
      'After his journey with SOA ended, Jinn Faraday finally found a new home with ALLSTAR, a car club whose name continues to rise in the northern region of Los Santos. Although ALLSTAR is known as a car and street racing community, Jinn joined not because of his driving skills, but because of his fighting and weapon skills, something that quickly made him well known within the group. In every major conflict involving ALLSTAR, Jinn is often at the forefront when things get chaotic.',
    description2:
      'In downtown Los Santos, ALLSTAR is known to the public for their large garage, which is always bustling with modified cars and customers from all walks of life. From the outside, it looks like a successful automotive business owned by a regular car community. But behind the garage and racing activities, ALLSTAR runs a shady business that makes their name even more feared on the streets, including a drug distribution network that gives them significant influence in the city.',
    description3:
      'Therefore, ALLSTAR is not just known as a car club but also as a dangerous gang when conflicts arise. Many other groups choose to back down rather than confront them directly, especially when their best members take to the streets. Now, Jinn and the ALLSTAR members are moving from a large mansion in the northern part of the city, and everyone in Los Santos knows one thing: behind their fast cars and luxurious lifestyle, ALLSTAR is a group that few dare to confront directly.',
  },
];

// Family data
const FAMILY = {
  missingPerson: {
    name: 'Abah Nanang',
    role: 'Father',
    youtube: 'https://www.youtube.com/@chunchun',
    status: 'missing',
  },
  bodyguard: {
    name: 'Spencer',
    role: 'Bodyguard',
    youtube: 'https://www.youtube.com/@fathirazri525',
  },
  mainCharacter: {
    name: 'Jinn Faraday',
    role: 'Main Character',
    youtube: 'https://www.youtube.com/@farisauliaarasy',
  },
  wife: {
    name: 'Adel Faraday',
    role: 'Wife',
    youtube: 'https://www.youtube.com/@adelkharisma4184',
  },
  brother: {
    name: 'Japor',
    role: 'Brother',
    youtube: 'https://www.youtube.com/@fazahandiko',
  },
  sisters1: [
    {
      name: 'Chuya',
      role: 'Sister',
      youtube: 'https://www.youtube.com/@Urfavchuya',
    },
    {
      name: 'Ayana',
      role: 'Sister',
      youtube: 'https://www.youtube.com/@celiazu',
    },
    {
      name: 'Mychia',
      role: 'Sister',
      youtube: 'https://www.youtube.com/@nonamonikhaa',
    },
  ],
  sisters2: [
    {
      name: 'Mizu',
      role: 'Sister',
      youtube: 'https://www.youtube.com/@Mizuuu',
    },
    {
      name: 'Yuri',
      role: 'Sister',
      youtube: 'https://www.youtube.com/@pookiemiaw',
    },
    {
      name: 'Aina',
      role: 'Sister',
      youtube: 'https://www.youtube.com/@iniinaaaaa',
    },
    {
      name: 'Ovvi',
      role: 'Sister',
      youtube: 'https://www.youtube.com/@realovvi',
    },
    {
      name: 'Sage',
      role: 'Sister',
      youtube: 'https://www.youtube.com/@SeighSagee',
    },
    {
      name: 'Lora',
      role: 'Sister',
      youtube: 'https://www.youtube.com/@haeraabc',
    },
  ],
  daughters: [
    {
      name: 'Mizuki',
      role: 'Daughter',
      youtube: 'https://www.youtube.com/@NandaKazesawa',
    },
    {
      name: 'Marina',
      role: 'Daughter',
      youtube: 'https://www.youtube.com/@cewlsii',
    },
    {
      name: 'Bee',
      role: 'Daughter',
      youtube: 'https://www.youtube.com/@Sheyuniies',
    },
    {
      name: 'Ayaya',
      role: 'Daughter',
      youtube: 'https://www.youtube.com/@AmeyaKirei',
    },
  ],
  nephews: [
    {
      name: 'Joanne',
      role: 'Nephew',
      youtube: 'https://www.youtube.com/@NattyNaaa',
    },
  ],
};
function App() {
  const { t, i18n } = useTranslation();
  let [showContent, setShowContent] = useState(false);
  let [activeCharacter, setActiveCharacter] = useState(0);
  let [wifeEasterEgg, setWifeEasterEgg] = useState(false);
  let [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const smoothScrollTo = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to('.vi-mask-group', {
      rotate: 8,
      duration: 1.2,
      ease: 'power2.inOut',
      transformOrigin: '50% 50%',
    }).to('.vi-mask-group', {
      scale: 12,
      duration: 1.8,
      delay: -0.8,
      ease: 'power2.out',
      transformOrigin: '50% 50%',
      opacity: 0,
      onUpdate: function () {
        // Show content earlier for smoother transition
        if (this.progress() >= 0.5 && !document.querySelector('.main')) {
          setShowContent(true);
        }
        // Start fading SVG overlay earlier
        if (this.progress() >= 0.7) {
          const svgElement = document.querySelector('.svg');
          if (svgElement && !svgElement.classList.contains('fading')) {
            svgElement.classList.add('fading');
            gsap.to(svgElement, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => svgElement.remove(),
            });
          }
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    // Use a single timeline for synchronized animations
    const heroTl = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: 'power3.out',
        force3D: true, // GPU acceleration
      },
    });

    // Responsive character animation based on screen size
    const screenWidth = window.innerWidth;
    let characterScale = 1.0;
    let characterBottom = '0%';

    if (screenWidth < 768) {
      characterScale = 0.7;
      characterBottom = '-15%';
    } else if (screenWidth < 1024) {
      characterScale = 0.8;
      characterBottom = '-25%';
    } else if (screenWidth < 1280) {
      characterScale = 0.85;
      characterBottom = '-45%';
    } else if (screenWidth < 1536) {
      characterScale = 0.9;
      characterBottom = '-50%';
    } else if (screenWidth < 2000) {
      characterScale = 1.0;
      characterBottom = '-50%';
    } else {
      characterScale = 1.2;
      characterBottom = '-40%';
    }

    // All hero elements animate together at the same time (position 0)
    heroTl
      .to(
        '.main',
        {
          scale: 1,
          rotate: 0,
        },
        0,
      )
      .to(
        '.sky',
        {
          scale: 1.1,
          rotate: 0,
        },
        0,
      )
      .to(
        '.bg',
        {
          scale: 1.1,
          rotate: 0,
        },
        0,
      )
      .to(
        '.character',
        {
          scale: characterScale,
          xPercent: -50,
          left: '50%',
          bottom: characterBottom,
          rotate: 0,
        },
        0,
      )
      .to(
        '.text',
        {
          scale: 1,
          rotate: 0,
        },
        0,
      );

    const main = document.querySelector('.main');

    main?.addEventListener('mousemove', function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to('.main .text', {
        x: `${xMove * 0.4}%`,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      });
      gsap.to('.sky', {
        x: xMove,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      });
      gsap.to('.bg', {
        x: xMove * 1.7,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      });
    });

    // Scroll animations - per section only
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -5% 0px',
    };

    const animateOnScroll = (entries) => {
      entries.forEach((entry) => {
        const section = entry.target;
        const elements = section.querySelectorAll('.scroll-animate');

        if (entry.isIntersecting) {
          elements.forEach((el) => el.classList.add('animate-in'));
        } else {
          elements.forEach((el) => el.classList.remove('animate-in'));
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Add scroll-animate class to Story section elements
    document
      .querySelectorAll('#story .limg, #story .rg, #story h1, #story p')
      .forEach((el) => {
        el.classList.add('scroll-animate');
      });

    // Add scroll-animate class to Family section elements (including connectors and heart)
    document
      .querySelectorAll(
        '#family h2, #family h3, #family p, #family .group, #family [class*="w-1"][class*="bg-yellow"], #family [class*="text-yellow-500"][class*="text-2xl"], #family [class*="text-yellow-500"][class*="text-4xl"]',
      )
      .forEach((el) => {
        el.classList.add('scroll-animate');
      });

    // Add scroll-animate class to Servers section elements
    document
      .querySelectorAll('#servers h2, #servers p, #servers .server-card')
      .forEach((el) => {
        el.classList.add('scroll-animate');
      });

    // Add scroll-animate class to Extras section (Missing Person & Bodyguard)
    document
      .querySelectorAll('#extras .extras-card, #extras h3, #extras p')
      .forEach((el) => {
        el.classList.add('scroll-animate');
      });

    // Observe sections (not individual elements)
    const storySection = document.querySelector('#story');
    const familySection = document.querySelector('#family');
    const serversSection = document.querySelector('#servers');
    const extrasSection = document.querySelector('#extras');

    if (storySection) observer.observe(storySection);
    if (familySection) observer.observe(familySection);
    if (serversSection) observer.observe(serversSection);
    if (extrasSection) observer.observe(extrasSection);

    return () => observer.disconnect();
  }, [showContent]);

  return (
    <>
      <div className='svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]'>
        <svg
          viewBox='0 0 800 600'
          preserveAspectRatio='xMidYMid slice'
          className='w-full h-full absolute inset-0'
        >
          <defs>
            <mask id='viMask'>
              <rect width='100%' height='100%' fill='black' />
              <g className='vi-mask-group'>
                <text
                  x='50%'
                  y='50%'
                  fontSize='250'
                  textAnchor='middle'
                  fill='white'
                  dominantBaseline='middle'
                  fontFamily='pricedown'
                >
                  JF
                </text>
              </g>
            </mask>
          </defs>
          <image
            href='./sky.png'
            width='100%'
            height='100%'
            preserveAspectRatio='xMidYMid slice'
            mask='url(#viMask)'
          />
        </svg>
      </div>
      {showContent && (
        <>
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className='fixed top-6 right-20 z-[60] w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full hover:bg-yellow-500/20 transition-all duration-300 text-white font-bold text-lg'
          >
            {i18n.language === 'en' ? 'ID' : 'EN'}
          </button>

          {/* Hamburger Menu Button - Outside main to avoid transform */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='fixed top-6 right-6 z-[60] w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full hover:bg-yellow-500/20 transition-all duration-300'
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            ></span>
          </button>

          {/* Fullscreen Menu Overlay - Outside main to avoid transform */}
          <div
            className={`fixed inset-0 z-[55] bg-black/70 backdrop-blur-md transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          >
            <div className='w-full h-full flex flex-col items-center justify-center gap-4 md:gap-8'>
              <a
                href='#home'
                onClick={(e) => smoothScrollTo(e, '#home')}
                className='text-3xl md:text-5xl lg:text-6xl text-white hover:text-yellow-500 transition-colors duration-300 font-bold'
              >
                {t('nav.home')}
              </a>
              <a
                href='#story'
                onClick={(e) => smoothScrollTo(e, '#story')}
                className='text-3xl md:text-5xl lg:text-6xl text-white hover:text-yellow-500 transition-colors duration-300 font-bold'
              >
                {t('nav.story')}
              </a>
              <a
                href='#family'
                onClick={(e) => smoothScrollTo(e, '#family')}
                className='text-3xl md:text-5xl lg:text-6xl text-white hover:text-yellow-500 transition-colors duration-300 font-bold'
              >
                {t('nav.family')}
              </a>
              <a
                href='#servers'
                onClick={(e) => smoothScrollTo(e, '#servers')}
                className='text-3xl md:text-5xl lg:text-6xl text-white hover:text-yellow-500 transition-colors duration-300 font-bold'
              >
                {t('nav.servers')}
              </a>
              <div className='flex gap-4 md:gap-6 mt-4 md:mt-8'>
                <a
                  href='https://www.instagram.com/farisauliaarasy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-3xl text-white hover:text-yellow-500 transition-colors'
                >
                  <i className='ri-instagram-fill'></i>
                </a>
                <a
                  href='https://www.youtube.com/@farisauliaarasy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-3xl text-white hover:text-yellow-500 transition-colors'
                >
                  <i className='ri-youtube-fill'></i>
                </a>
                <a
                  href='https://www.tiktok.com/@farisauliaarasy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-3xl text-white hover:text-yellow-500 transition-colors'
                >
                  <i className='ri-tiktok-fill'></i>
                </a>
                <a
                  href='https://discord.gg/kkk-511210755841064981'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-3xl text-white hover:text-yellow-500 transition-colors'
                >
                  <i className='ri-discord-fill'></i>
                </a>
                <a
                  href='https://www.facebook.com/farisauliaarasy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-3xl text-white hover:text-yellow-500 transition-colors'
                >
                  <i className='ri-facebook-fill'></i>
                </a>
              </div>
            </div>
          </div>

          <div className='main w-full rotate-[-10deg] scale-[1.7]'>
            <div
              id='home'
              className='landing overflow-hidden relative w-full h-screen bg-black'
            >
              <div className='imagesdiv relative overflow-hidden w-full h-screen'>
                <img
                  className='absolute sky scale-[1.15] rotate-[-20deg] top-0 left-0 w-full h-full object-cover'
                  src='./sky.png'
                  alt=''
                  loading='eager'
                  decoding='async'
                />
                <img
                  className='absolute scale-[1.1] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover'
                  src='./bg.png'
                  alt=''
                  loading='eager'
                  decoding='async'
                />
                <div className='text text-white flex flex-col gap-1 md:gap-2 lg:gap-2 xl:gap-3 absolute top-10 md:top-16 lg:top-16 xl:top-20 left-1/2 -translate-x-1/2 scale-[0.5] md:scale-[0.7] lg:scale-[0.9] xl:scale-[1.4] rotate-[-10deg]'>
                  <h1 className='text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[12rem] leading-none -ml-10 md:-ml-16 lg:-ml-24 xl:-ml-40'>
                    {t('hero.story').toLowerCase()}
                  </h1>
                  <h1 className='text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[12rem] leading-none'>
                    {t('hero.of').toLowerCase()} jinn
                  </h1>
                  <h1 className='text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[12rem] leading-none -ml-10 md:-ml-16 lg:-ml-24 xl:-ml-40'>
                    faraday
                  </h1>
                  {/* Champion Badge - Mobile/Tablet (inside text) */}
                  <div className='champion-badge lg:hidden flex items-center gap-2 mt-2 md:mt-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full px-4 py-2 w-fit ml-auto mr-0'>
                    <i className='ri-trophy-fill text-yellow-500 text-lg md:text-xl animate-pulse'></i>
                    <span className='font-[Inter] text-xs md:text-sm text-yellow-500 font-bold uppercase tracking-wider'>
                      2x Champions
                    </span>
                  </div>
                </div>
                {/* Champion Badge - Laptop/Desktop (top-left corner) */}
                <div className='champion-badge hidden lg:flex items-center gap-2 absolute top-6 left-6 xl:top-8 xl:left-8 z-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full px-4 py-2 xl:px-6 xl:py-3 backdrop-blur-sm'>
                  <i className='ri-trophy-fill text-yellow-500 text-xl xl:text-2xl animate-pulse'></i>
                  <span className='font-[Inter] text-sm xl:text-base text-yellow-500 font-bold uppercase tracking-wider'>
                    2x Champions
                  </span>
                </div>
                <img
                  className='absolute character -bottom-[160%] left-1/2 -translate-x-1/2 scale-[2.7] rotate-[-20deg]'
                  src='./herobg.png'
                  alt=''
                  loading='eager'
                  decoding='async'
                />
              </div>
              <div className='btmbar text-white absolute bottom-0 left-0 w-full py-4 md:py-8 px-4 md:px-10 bg-gradient-to-t from-black to-transparent'>
                <div className='flex justify-center items-center gap-4 md:gap-8'>
                  <a
                    href='https://www.instagram.com/farisauliaarasy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-4xl hover:text-yellow-500 transition-colors duration-300'
                  >
                    <i className='ri-instagram-fill'></i>
                  </a>
                  <a
                    href='https://www.youtube.com/@farisauliaarasy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-4xl hover:text-yellow-500 transition-colors duration-300'
                  >
                    <i className='ri-youtube-fill'></i>
                  </a>
                  <a
                    href='https://www.tiktok.com/@farisauliaarasy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-4xl hover:text-yellow-500 transition-colors duration-300'
                  >
                    <i className='ri-tiktok-fill'></i>
                  </a>
                  <a
                    href='https://discord.gg/kkk-511210755841064981'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-4xl hover:text-yellow-500 transition-colors duration-300'
                  >
                    <i className='ri-discord-fill'></i>
                  </a>
                  <a
                    href='https://www.facebook.com/farisauliaarasy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-4xl hover:text-yellow-500 transition-colors duration-300'
                  >
                    <i className='ri-facebook-fill'></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              id='story'
              className='w-full min-h-screen flex items-center justify-center bg-black py-10 md:py-20 px-4 md:px-10 lg:px-16 xl:px-24 2xl:px-32 relative'
            >
              <Particles />
              <div className='cntnr flex flex-col lg:flex-row items-center justify-center text-white w-full max-w-[1800px] mx-auto gap-8 lg:gap-16 relative z-10'>
                {/* Character Switch Buttons - Shows first on mobile */}
                <div className='order-1 lg:order-none lg:hidden flex justify-center gap-2 md:gap-4'>
                  {CHARACTERS.map((char, index) => (
                    <button
                      key={char.id}
                      onClick={() => setActiveCharacter(index)}
                      className={`px-4 md:px-8 py-2 md:py-4 text-sm md:text-xl font-bold uppercase tracking-wider transition-all duration-300 border-2 ${
                        activeCharacter === index
                          ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)]'
                          : 'bg-transparent text-white border-white/30 hover:border-yellow-500 hover:text-yellow-500'
                      }`}
                    >
                      {char.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <div className='limg order-2 lg:order-none w-full lg:w-[50%] flex items-center justify-center'>
                  <img
                    className='max-w-full max-h-[350px] md:max-h-[400px] lg:max-h-[400px] xl:max-h-[500px] 2xl:max-h-[700px] object-contain transition-all duration-500 scale-100 lg:scale-100 xl:scale-105 2xl:scale-115'
                    src={CHARACTERS[activeCharacter].image}
                    alt={CHARACTERS[activeCharacter].name}
                    loading='lazy'
                    decoding='async'
                  />
                </div>
                <div className='rg order-3 lg:order-none w-full lg:w-[45%] text-center lg:text-left'>
                  {/* Character Switch Buttons - Shows only on desktop */}
                  <div className='hidden lg:flex justify-start gap-2 md:gap-3 xl:gap-3 2xl:gap-4 mb-4 md:mb-6 xl:mb-6 2xl:mb-8'>
                    {CHARACTERS.map((char, index) => (
                      <button
                        key={char.id}
                        onClick={() => setActiveCharacter(index)}
                        className={`px-4 md:px-6 xl:px-6 2xl:px-8 py-2 md:py-3 xl:py-3 2xl:py-4 text-sm md:text-base xl:text-lg 2xl:text-xl font-bold uppercase tracking-wider transition-all duration-300 border-2 ${
                          activeCharacter === index
                            ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)]'
                            : 'bg-transparent text-white border-white/30 hover:border-yellow-500 hover:text-yellow-500'
                        }`}
                      >
                        {char.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  <h1 className='text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight'>
                    {activeCharacter === 0
                      ? t('soa.title')
                      : t('allstar.title')}
                  </h1>
                  <h1 className='text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight'>
                    {activeCharacter === 0
                      ? t('soa.subtitle')
                      : t('allstar.subtitle')}
                  </h1>
                  <p className='mt-4 md:mt-4 lg:mt-4 xl:mt-5 2xl:mt-6 text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg font-[Inter] text-gray-300 leading-relaxed'>
                    {activeCharacter === 0
                      ? t('soa.description1')
                      : t('allstar.description1')}
                  </p>
                  <p className='mt-2 md:mt-2 lg:mt-2 xl:mt-3 2xl:mt-4 text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg font-[Inter] text-gray-300 leading-relaxed'>
                    {activeCharacter === 0
                      ? t('soa.description2')
                      : t('allstar.description2')}
                  </p>
                  <p className='mt-2 md:mt-2 lg:mt-2 xl:mt-3 2xl:mt-4 text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg font-[Inter] text-gray-300 leading-relaxed'>
                    {activeCharacter === 0
                      ? t('soa.description3')
                      : t('allstar.description3')}
                  </p>
                </div>
              </div>
            </div>

            <div
              id='family'
              className='w-full min-h-screen bg-black py-10 md:py-20 px-4 md:px-10 lg:px-16 xl:px-24 2xl:px-32 relative'
            >
              <Particles />
              <div className='max-w-[1800px] mx-auto relative z-10'>
                {/* Section Title */}
                <div className='text-center mb-8 md:mb-12 lg:mb-14 xl:mb-16'>
                  <h2 className='text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl text-white mb-2 md:mb-4'>
                    {t('family.title1')}
                  </h2>
                  <h2 className='text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl text-yellow-500'>
                    {t('family.title2')}
                  </h2>
                  <p className='mt-4 md:mt-6 text-sm md:text-base lg:text-base xl:text-base 2xl:text-xl font-[Inter] text-gray-400 max-w-2xl mx-auto px-4'>
                    {t('family.description')}
                  </p>
                </div>

                {/* Family Tree Grid */}
                <div className='flex flex-col items-center gap-6 md:gap-10'>
                  {/* Jinn + Wife Row */}
                  <div className='flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12'>
                    {/* Jinn - Main Character */}
                    <div className='group relative'>
                      <div className='w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-44 xl:h-44 2xl:w-48 2xl:h-48 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/20 border-2 md:border-4 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] md:shadow-[0_0_30px_rgba(234,179,8,0.4)] group-hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] transition-all duration-300 flex items-center justify-center relative'>
                        <i className='ri-user-star-fill text-4xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-7xl text-yellow-500'></i>
                        {FAMILY.mainCharacter.youtube && (
                          <a
                            href={FAMILY.mainCharacter.youtube}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                          >
                            <i className='ri-youtube-fill text-3xl md:text-5xl text-red-500 hover:scale-125 transition-transform'></i>
                          </a>
                        )}
                      </div>
                      <div className='text-center mt-2 md:mt-4'>
                        <h3 className='text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-bold font-[Inter]'>
                          {FAMILY.mainCharacter.name}
                        </h3>
                        <p className='text-sm md:text-base text-yellow-500 font-[Inter]'>
                          {t('family.roles.mainCharacter')}
                        </p>
                      </div>
                    </div>

                    {/* Heart connector */}
                    <div className='text-yellow-500 text-2xl md:text-4xl'>
                      ❤
                    </div>

                    {/* Wife */}
                    <div className='group relative'>
                      <div className='w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-44 xl:h-44 2xl:w-48 2xl:h-48 rounded-full bg-gradient-to-br from-pink-500/30 to-pink-600/20 border-2 md:border-4 border-pink-500/50 group-hover:border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] md:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 flex items-center justify-center relative'>
                        <i className='ri-user-heart-fill text-4xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-7xl text-pink-500'></i>
                        {FAMILY.wife.youtube && (
                          <a
                            href={FAMILY.wife.youtube}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                          >
                            <i className='ri-youtube-fill text-3xl md:text-5xl text-red-500 hover:scale-125 transition-transform'></i>
                          </a>
                        )}
                      </div>
                      <div className='text-center mt-2 md:mt-4'>
                        <h3
                          className='text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-bold font-[Inter] cursor-pointer hover:text-pink-400 transition-colors'
                          onClick={() => setWifeEasterEgg(!wifeEasterEgg)}
                        >
                          {wifeEasterEgg ? 'Seno Parulian' : FAMILY.wife.name}
                        </h3>
                        <p className='text-sm md:text-base text-pink-500 font-[Inter]'>
                          {t('family.roles.wife')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div className='w-1 h-4 md:h-8 bg-yellow-500/50'></div>

                  {/* Siblings Label */}
                  <div className='text-center'>
                    <h3 className='text-lg md:text-2xl text-gray-400 font-[Inter]'>
                      {t('family.roles.siblings')}
                    </h3>
                  </div>

                  {/* Brother + Sisters Row */}
                  <div className='flex justify-center gap-3 md:gap-6 flex-wrap max-w-[700px] items-end'>
                    {/* Brother */}
                    <div className='group relative'>
                      <div className='w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-2 md:border-4 border-blue-500/30 group-hover:border-blue-500 transition-all duration-300 flex items-center justify-center relative'>
                        <i className='ri-men-fill text-2xl md:text-3xl lg:text-4xl text-blue-500 group-hover:text-blue-400 transition-colors'></i>
                        {FAMILY.brother.youtube && (
                          <a
                            href={FAMILY.brother.youtube}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                          >
                            <i className='ri-youtube-fill text-xl md:text-3xl text-red-500 hover:scale-125 transition-transform'></i>
                          </a>
                        )}
                      </div>
                      <div className='text-center mt-2 md:mt-3'>
                        <h3 className='text-xs md:text-sm text-white font-bold font-[Inter]'>
                          {FAMILY.brother.name}
                        </h3>
                        <p className='text-blue-500 font-[Inter] text-[10px] md:text-xs'>
                          {t('family.roles.brother')}
                        </p>
                      </div>
                    </div>

                    {/* Sisters */}
                    {FAMILY.sisters1.map((sister, index) => (
                      <div key={index} className='group relative'>
                        <div className='w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 md:border-4 border-white/30 group-hover:border-yellow-500 transition-all duration-300 flex items-center justify-center relative'>
                          <i className='ri-women-fill text-2xl md:text-3xl lg:text-4xl text-white/70 group-hover:text-yellow-500 transition-colors'></i>
                          {sister.youtube && (
                            <a
                              href={sister.youtube}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                            >
                              <i className='ri-youtube-fill text-xl md:text-3xl text-red-500 hover:scale-125 transition-transform'></i>
                            </a>
                          )}
                        </div>
                        <div className='text-center mt-2 md:mt-3'>
                          <h3 className='text-xs md:text-sm text-white font-bold font-[Inter]'>
                            {sister.name}
                          </h3>
                          <p className='text-gray-500 font-[Inter] text-[10px] md:text-xs'>
                            {t('family.roles.sister')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sisters Row 2 */}
                  <div className='flex justify-center gap-3 md:gap-6 flex-wrap max-w-[1000px] mt-4'>
                    {FAMILY.sisters2.map((sister, index) => (
                      <div key={index} className='group relative'>
                        <div className='w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 md:border-4 border-white/30 group-hover:border-yellow-500 transition-all duration-300 flex items-center justify-center relative'>
                          <i className='ri-women-fill text-2xl md:text-3xl lg:text-4xl text-white/70 group-hover:text-yellow-500 transition-colors'></i>
                          {sister.youtube && (
                            <a
                              href={sister.youtube}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                            >
                              <i className='ri-youtube-fill text-xl md:text-3xl text-red-500 hover:scale-125 transition-transform'></i>
                            </a>
                          )}
                        </div>
                        <div className='text-center mt-2 md:mt-3'>
                          <h3 className='text-xs md:text-sm text-white font-bold font-[Inter]'>
                            {sister.name}
                          </h3>
                          <p className='text-gray-500 font-[Inter] text-[10px] md:text-xs'>
                            {t('family.roles.sister')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connector Line */}
                  <div className='w-1 h-4 md:h-8 bg-yellow-500/50'></div>

                  {/* Children Label */}
                  <div className='text-center'>
                    <h3 className='text-lg md:text-2xl text-gray-400 font-[Inter]'>
                      {t('family.roles.children')}
                    </h3>
                  </div>

                  {/* Children Row (Daughters + Nephew) */}
                  <div className='flex justify-center gap-4 md:gap-8 flex-wrap'>
                    {/* Daughters */}
                    {FAMILY.daughters.map((daughter, index) => (
                      <div key={`daughter-${index}`} className='group relative'>
                        <div className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-pink-400/20 to-pink-500/10 border-2 md:border-4 border-pink-400/30 group-hover:border-pink-400 transition-all duration-300 flex items-center justify-center relative'>
                          <i className='ri-bear-smile-fill text-3xl md:text-4xl lg:text-5xl text-pink-400/70 group-hover:text-pink-400 transition-colors'></i>
                          {daughter.youtube && (
                            <a
                              href={daughter.youtube}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                            >
                              <i className='ri-youtube-fill text-2xl md:text-4xl text-red-500 hover:scale-125 transition-transform'></i>
                            </a>
                          )}
                        </div>
                        <div className='text-center mt-2 md:mt-3'>
                          <h3 className='text-xs md:text-sm lg:text-base text-white font-bold font-[Inter]'>
                            {daughter.name}
                          </h3>
                          <p className='text-pink-400 font-[Inter] text-[10px] md:text-xs'>
                            {t('family.roles.daughter')}
                          </p>
                        </div>
                      </div>
                    ))}
                    {/* Nephews */}
                    {FAMILY.nephews.map((nephew, index) => (
                      <div key={`nephew-${index}`} className='group relative'>
                        <div className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-500/10 border-2 md:border-4 border-amber-400/30 group-hover:border-amber-400 transition-all duration-300 flex items-center justify-center relative'>
                          <i className='ri-user-smile-fill text-3xl md:text-4xl lg:text-5xl text-amber-400/70 group-hover:text-amber-400 transition-colors'></i>
                          {nephew.youtube && (
                            <a
                              href={nephew.youtube}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                            >
                              <i className='ri-youtube-fill text-2xl md:text-4xl text-red-500 hover:scale-125 transition-transform'></i>
                            </a>
                          )}
                        </div>
                        <div className='text-center mt-2 md:mt-3'>
                          <h3 className='text-xs md:text-sm lg:text-base text-white font-bold font-[Inter]'>
                            {nephew.name}
                          </h3>
                          <p className='text-amber-400 font-[Inter] text-[10px] md:text-xs'>
                            {t('family.roles.nephew')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Missing Person & Bodyguard Section */}
            <div
              id='extras'
              className='w-full bg-black py-8 md:py-12 px-4 md:px-10'
            >
              <div className='max-w-[900px] mx-auto flex flex-col md:flex-row gap-6 justify-center'>
                {/* Bodyguard Card */}
                <div className='flex-1 max-w-[400px] extras-card'>
                  <div className='bg-gradient-to-b from-green-950/30 to-black border-2 border-green-500/50 rounded-lg p-4 md:p-6 relative overflow-hidden h-full'>
                    {/* Shield banner */}
                    <div className='absolute -left-10 top-4 w-[120%] h-6 bg-green-600 transform -rotate-3 flex items-center justify-center z-10'>
                      <p className='text-white font-bold text-xs tracking-widest whitespace-nowrap'>
                        | {t('family.roles.bodyguard').toUpperCase()} |{' '}
                        {t('family.roles.bodyguard').toUpperCase()} |{' '}
                        {t('family.roles.bodyguard').toUpperCase()} |{' '}
                        {t('family.roles.bodyguard').toUpperCase()} |{' '}
                        {t('family.roles.bodyguard').toUpperCase()} |{' '}
                        {t('family.roles.bodyguard').toUpperCase()} |
                      </p>
                    </div>

                    <div className='mt-8 flex flex-col items-center'>
                      {/* Photo placeholder */}
                      <div className='group relative'>
                        <div className='w-24 h-24 md:w-28 md:h-28 rounded-lg bg-gradient-to-br from-green-900/50 to-green-950 border-4 border-green-600/50 flex items-center justify-center relative'>
                          <i className='ri-shield-user-fill text-4xl md:text-5xl text-green-500'></i>
                          {FAMILY.bodyguard.youtube && (
                            <a
                              href={FAMILY.bodyguard.youtube}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='absolute inset-0 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                            >
                              <i className='ri-youtube-fill text-2xl md:text-4xl text-red-500 hover:scale-125 transition-transform'></i>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Name and details */}
                      <div className='text-center mt-4'>
                        <h3 className='text-xl md:text-2xl text-green-500 font-bold font-[Inter]'>
                          {FAMILY.bodyguard.name}
                        </h3>
                        <p className='text-gray-400 font-[Inter] text-sm mt-1'>
                          {t('family.roles.bodyguard')}
                        </p>
                        <p className='text-green-400/70 font-[Inter] text-xs mt-2 italic'>
                          "Always on duty"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Missing Person Card */}
                <div className='flex-1 max-w-[400px] extras-card'>
                  <div className='bg-gradient-to-b from-red-950/30 to-black border-2 border-red-500/50 rounded-lg p-4 md:p-6 relative overflow-hidden h-full'>
                    {/* Police tape effect */}
                    <div className='absolute -left-10 top-4 w-[120%] h-6 bg-yellow-500 transform -rotate-3 flex items-center justify-center z-10'>
                      <p className='text-black font-bold text-xs tracking-widest whitespace-nowrap'>
                        | {t('family.roles.missing')} |{' '}
                        {t('family.roles.missing').toUpperCase()} |{' '}
                        {t('family.roles.missing').toUpperCase()} |{' '}
                        {t('family.roles.missing').toUpperCase()} |{' '}
                        {t('family.roles.missing').toUpperCase()} |{' '}
                        {t('family.roles.missing')} |
                      </p>
                    </div>

                    <div className='mt-8 flex flex-col items-center'>
                      {/* Photo placeholder */}
                      <div className='group relative'>
                        <div className='w-24 h-24 md:w-28 md:h-28 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-600 flex items-center justify-center relative'>
                          <i className='ri-ghost-fill text-4xl md:text-5xl text-gray-500'></i>
                          {FAMILY.missingPerson.youtube && (
                            <a
                              href={FAMILY.missingPerson.youtube}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='absolute inset-0 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                            >
                              <i className='ri-youtube-fill text-2xl md:text-4xl text-red-500 hover:scale-125 transition-transform'></i>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Name and details */}
                      <div className='text-center mt-4'>
                        <h3 className='text-xl md:text-2xl text-red-500 font-bold font-[Inter]'>
                          {FAMILY.missingPerson.name}
                        </h3>
                        <p className='text-gray-400 font-[Inter] text-sm mt-1'>
                          {t('family.roles.father')}
                        </p>
                        <p className='text-red-400/70 font-[Inter] text-xs mt-2 italic'>
                          "Last seen: Unknown"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Server Roleplay Section */}
            <div
              id='servers'
              className='w-full min-h-screen flex flex-col items-center justify-center bg-black py-16 md:py-24 px-4 md:px-10 relative'
            >
              <Particles />
              <div className='max-w-[1400px] mx-auto w-full relative z-10'>
                {/* Section Title */}
                <div className='text-center mb-12 md:mb-16'>
                  <h2 className='text-4xl md:text-6xl lg:text-7xl text-white mb-4'>
                    {t('servers.title')}
                  </h2>
                  <p className='text-gray-400 font-[Inter] text-sm md:text-base lg:text-lg max-w-2xl mx-auto'>
                    {t('servers.description')}
                  </p>
                </div>

                {/* Server Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
                  {/* Server SOI */}
                  <div className='group server-card relative overflow-hidden rounded-2xl border-2 border-yellow-500/20 hover:border-yellow-500/60 transition-all duration-500 bg-black/50 backdrop-blur-sm'>
                    <div className='relative overflow-hidden'>
                      <img
                        src='./serversoi.png'
                        alt='Server SOI'
                        className='w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700'
                        loading='lazy'
                        decoding='async'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent'></div>
                    </div>
                    <div className='p-6 md:p-8'>
                      <h3 className='text-2xl md:text-3xl text-yellow-500 mb-2'>
                        {t('servers.soi.name')}
                      </h3>
                      <p className='text-gray-400 font-[Inter] text-sm md:text-base mb-4'>
                        {t('servers.soi.description')}
                      </p>
                      <div className='flex items-center gap-2 text-gray-500 font-[Inter] text-sm'>
                        <i className='ri-gamepad-fill text-yellow-500'></i>
                        <span>{t('servers.platform')}</span>
                      </div>
                    </div>
                    {/* Glow effect on hover */}
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'>
                      <div className='absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10'></div>
                    </div>
                  </div>

                  {/* Server IME */}
                  <div className='group server-card relative overflow-hidden rounded-2xl border-2 border-pink-500/20 hover:border-pink-500/60 transition-all duration-500 bg-black/50 backdrop-blur-sm'>
                    <div className='relative overflow-hidden'>
                      <img
                        src='./serverime.png'
                        alt='Server IME'
                        className='w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700'
                        loading='lazy'
                        decoding='async'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent'></div>
                    </div>
                    <div className='p-6 md:p-8'>
                      <h3 className='text-2xl md:text-3xl text-pink-500 mb-2'>
                        {t('servers.ime.name')}
                      </h3>
                      <p className='text-gray-400 font-[Inter] text-sm md:text-base mb-4'>
                        {t('servers.ime.description')}
                      </p>
                      <div className='flex items-center gap-2 text-gray-500 font-[Inter] text-sm'>
                        <i className='ri-gamepad-fill text-pink-500'></i>
                        <span>{t('servers.platform')}</span>
                      </div>
                    </div>
                    {/* Glow effect on hover */}
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'>
                      <div className='absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className='w-full bg-black border-t border-yellow-500/20 py-4 md:py-8 px-4 md:px-10'>
              <div className='max-w-[1800px] mx-auto text-center'>
                <p className='text-gray-500 font-[Inter] text-sm'>
                  Built with 🤘 by{' '}
                  <a
                    href='https://instagram.com/alfiyyann'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-yellow-500 hover:text-yellow-400 transition-colors'
                  >
                    @alfiyyann
                  </a>
                </p>
                <p className='text-gray-600 font-[Inter] text-xs mt-2'>
                  {t('footer.disclaimer')}
                </p>
                <p className='text-gray-600 font-[Inter] text-xs mt-1'>
                  {t('footer.notAffiliated')}
                </p>
                <p className='text-gray-600 font-[Inter] text-xs mt-1'>
                  {t('footer.roleplay')}
                </p>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
}

export default App;
