'use client';

import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

// Import components
import Hero from './Hero';
import Story from './Story';
import Family from './Family';
import Servers from './Servers';
import Footer from './Footer';
import Sidebar from './Sidebar';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [showContent, setShowContent] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState(0);
  const [wifeEasterEgg, setWifeEasterEgg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showChampionPopup, setShowChampionPopup] = useState(false);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'id' : 'en';
    // Get the path without locale prefix
    const pathWithoutLocale = pathname.replace(/^\/(en|id)/, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const smoothScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
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
        if (this.progress() >= 0.5 && !document.querySelector('.main')) {
          setShowContent(true);
        }
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

    const heroTl = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: 'power3.out',
        force3D: true,
      },
    });

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

    heroTl
      .to('.main', { scale: 1, rotate: 0 }, 0)
      .to('.sky', { scale: 1.1, rotate: 0 }, 0)
      .to('.bg', { scale: 1.1, rotate: 0 }, 0)
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
      .to('.text', { scale: 1, rotate: 0 }, 0);

    const main = document.querySelector('.main');

    // Only enable parallax on non-mobile devices
    if (screenWidth >= 768) {
      main?.addEventListener('mousemove', function (e) {
        const xMove =
          ((e as MouseEvent).clientX / window.innerWidth - 0.5) * 40;
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
    }

    // Scroll animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -5% 0px',
    };

    const animateOnScroll = (entries: IntersectionObserverEntry[]) => {
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

    document
      .querySelectorAll('#story .limg, #story .rg, #story h1, #story p')
      .forEach((el) => {
        el.classList.add('scroll-animate');
      });

    document
      .querySelectorAll(
        '#family h2, #family h3, #family p, #family .group, #family [class*="w-1"][class*="bg-yellow"], #family [class*="text-yellow-500"][class*="text-2xl"], #family [class*="text-yellow-500"][class*="text-4xl"]',
      )
      .forEach((el) => {
        el.classList.add('scroll-animate');
      });

    document
      .querySelectorAll('#servers h2, #servers p, #servers .server-card')
      .forEach((el) => {
        el.classList.add('scroll-animate');
      });

    document
      .querySelectorAll('#extras .extras-card, #extras h3, #extras p')
      .forEach((el) => {
        el.classList.add('scroll-animate');
      });

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
      <div className='svg flex items-center justify-center fixed top-0 left-0 z-100 w-full h-screen overflow-hidden bg-[#000]'>
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
            href='/sky.png'
            width='100%'
            height='100%'
            preserveAspectRatio='xMidYMid slice'
            mask='url(#viMask)'
          />
        </svg>
      </div>
      {showContent && (
        <>
          <Sidebar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            toggleLanguage={toggleLanguage}
            smoothScrollTo={smoothScrollTo}
          />

          <div className='main w-full rotate-[-10deg] scale-[1.7]'>
            <Hero
              showChampionPopup={showChampionPopup}
              setShowChampionPopup={setShowChampionPopup}
            />
            <Story
              activeCharacter={activeCharacter}
              setActiveCharacter={setActiveCharacter}
            />
            <Family
              wifeEasterEgg={wifeEasterEgg}
              setWifeEasterEgg={setWifeEasterEgg}
            />
            <Servers />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
