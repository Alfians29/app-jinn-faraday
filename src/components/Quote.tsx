'use client';

import { useTranslation } from 'react-i18next';
import Particles from './Particles';

export default function Quote() {
  const { t } = useTranslation();

  return (
    <div
      id='quote'
      className='w-full bg-black pt-0 pb-16 md:pb-24 px-4 md:px-10 relative overflow-hidden'
    >
      <Particles />
      <div className='max-w-[1200px] mx-auto relative z-10 flex flex-col items-center justify-center text-center'>
        {/* Quote Mark */}
        <div className='quote-mark text-yellow-500/20 text-[100px] md:text-[150px] leading-none font-serif mb-[-40px] md:mb-[-60px]'>
          &ldquo;
        </div>

        {/* Quote Text */}
        <blockquote className='quote-text text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl text-white font-bold leading-tight max-w-4xl'>
          {t('quote.text')}
        </blockquote>

        {/* Author */}
        <p className='quote-author text-yellow-500 font-[Inter] text-lg md:text-xl mt-6 md:mt-8'>
          {t('quote.author')}
        </p>

        {/* Decorative line */}
        <div className='quote-line w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mt-8 rounded-full'></div>
      </div>
    </div>
  );
}
