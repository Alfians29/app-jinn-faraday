'use client';

import { useTranslation } from 'react-i18next';

interface SidebarProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  toggleLanguage: () => void;
  smoothScrollTo: (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => void;
}

export default function Sidebar({
  menuOpen,
  setMenuOpen,
  toggleLanguage,
  smoothScrollTo,
}: SidebarProps) {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* Hamburger Menu Button */}
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

      {/* Fullscreen Menu Overlay */}
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

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className='mt-6 md:mt-8 px-6 py-3 bg-yellow-500/20 border border-yellow-500/50 rounded-full hover:bg-yellow-500/30 transition-all duration-300 text-yellow-500 font-bold text-lg flex items-center gap-2'
          >
            <i className='ri-translate-2'></i>
            {i18n.language === 'en' ? 'Bahasa Indonesia' : 'English'}
          </button>
        </div>
      </div>
    </>
  );
}
