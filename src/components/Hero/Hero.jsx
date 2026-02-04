import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero = ({ showChampionPopup, setShowChampionPopup }) => {
  const { t } = useTranslation();

  return (
    <div
      id='home'
      className='landing overflow-hidden relative w-full h-[100dvh] min-h-screen bg-black'
    >
      <div className='imagesdiv relative overflow-hidden w-full h-[100dvh] min-h-screen'>
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
          <div className='relative'>
            <button
              onClick={() => setShowChampionPopup(!showChampionPopup)}
              className='champion-badge lg:hidden flex items-center gap-2 mt-2 md:mt-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full px-4 py-2 w-fit mx-auto cursor-pointer hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all duration-300'
            >
              <i className='ri-trophy-fill text-yellow-500 text-lg md:text-xl animate-pulse'></i>
              <span className='font-[Inter] text-xs md:text-sm text-yellow-500 font-bold uppercase tracking-wider'>
                2x Champions
              </span>
            </button>
            {/* Popup for Mobile */}
            {showChampionPopup && (
              <div className='lg:hidden absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md border border-yellow-500/50 rounded-lg p-4 z-50 shadow-[0_0_20px_rgba(234,179,8,0.3)]'>
                <div className='flex flex-col gap-3'>
                  <div className='flex items-center gap-3 whitespace-nowrap'>
                    <i className='ri-trophy-fill text-yellow-500 text-lg flex-shrink-0'></i>
                    <span className='font-[Inter] text-white font-bold text-sm'>
                      Rise City League S1
                    </span>
                  </div>
                  <div className='flex items-center gap-3 whitespace-nowrap'>
                    <i className='ri-trophy-fill text-yellow-500 text-lg flex-shrink-0'></i>
                    <span className='font-[Inter] text-white font-bold text-sm'>
                      State Of Battleground
                    </span>
                  </div>
                </div>
                <div className='absolute -top-2 right-4 w-4 h-4 bg-black/90 border-l border-t border-yellow-500/50 transform rotate-45'></div>
              </div>
            )}
          </div>
        </div>
        {/* Champion Badge - Laptop/Desktop (top-left corner) */}
        <div className='absolute top-6 left-6 xl:top-8 xl:left-8 z-20'>
          <button
            onClick={() => setShowChampionPopup(!showChampionPopup)}
            className='champion-badge hidden lg:flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full px-4 py-2 xl:px-6 xl:py-3 backdrop-blur-sm cursor-pointer hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all duration-300'
          >
            <i className='ri-trophy-fill text-yellow-500 text-xl xl:text-2xl animate-pulse'></i>
            <span className='font-[Inter] text-sm xl:text-base text-yellow-500 font-bold uppercase tracking-wider'>
              2x Champions
            </span>
          </button>
          {/* Popup for Desktop */}
          {showChampionPopup && (
            <div className='hidden lg:block absolute top-full left-0 mt-3 bg-black/90 backdrop-blur-md border border-yellow-500/50 rounded-lg p-5 z-50 shadow-[0_0_25px_rgba(234,179,8,0.3)]'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3 whitespace-nowrap'>
                  <i className='ri-trophy-fill text-yellow-500 text-2xl flex-shrink-0'></i>
                  <span className='font-[Inter] text-white font-bold text-lg'>
                    Rise City League S1
                  </span>
                </div>
                <div className='flex items-center gap-3 whitespace-nowrap'>
                  <i className='ri-trophy-fill text-yellow-500 text-2xl flex-shrink-0'></i>
                  <span className='font-[Inter] text-white font-bold text-lg'>
                    State Of Battleground
                  </span>
                </div>
              </div>
              <div className='absolute -top-2 left-6 w-4 h-4 bg-black/90 border-l border-t border-yellow-500/50 transform rotate-45'></div>
            </div>
          )}
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
            className='text-2xl md:text-4xl hover:text-yellow-500 transition-colors duration-300'
          >
            <i className='ri-instagram-fill'></i>
          </a>
          <a
            href='https://www.youtube.com/@farisauliaarasy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-2xl md:text-4xl hover:text-yellow-500 transition-colors duration-300'
          >
            <i className='ri-youtube-fill'></i>
          </a>
          <a
            href='https://www.tiktok.com/@farisauliaarasy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-2xl md:text-4xl hover:text-yellow-500 transition-colors duration-300'
          >
            <i className='ri-tiktok-fill'></i>
          </a>
          <a
            href='https://discord.gg/kkk-511210755841064981'
            target='_blank'
            rel='noopener noreferrer'
            className='text-2xl md:text-4xl hover:text-yellow-500 transition-colors duration-300'
          >
            <i className='ri-discord-fill'></i>
          </a>
          <a
            href='https://www.facebook.com/farisauliaarasy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-2xl md:text-4xl hover:text-yellow-500 transition-colors duration-300'
          >
            <i className='ri-facebook-fill'></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
