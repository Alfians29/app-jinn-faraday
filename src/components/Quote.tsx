'use client';

import { useTranslation } from 'react-i18next';

export default function Quote() {
  const { t } = useTranslation();

  return (
    <div
      id='quote'
      className='w-full min-h-[70vh] flex items-center justify-center bg-black py-0 px-4 md:px-10 relative overflow-hidden'
    >
      {/* Background Image */}
      <img
        src='/quotes.png'
        alt=''
        className='absolute inset-0 w-full h-full object-cover opacity-60'
        loading='lazy'
        decoding='async'
      />
      {/* Edge Smoothing Gradients */}
      <div className='absolute inset-0 bg-linear-to-b from-black via-transparent to-black opacity-100'></div>
      <div className='absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black to-transparent'></div>
      <div className='absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent'></div>

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
