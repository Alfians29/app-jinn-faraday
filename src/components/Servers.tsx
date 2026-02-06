'use client';

import { useTranslation } from 'react-i18next';
import { Particles } from './Story';

export default function Servers() {
  const { t } = useTranslation();

  return (
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
                src='/serversoi.png'
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
              <a
                href='https://stateofindonesia.id/'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg hover:bg-yellow-500/30 transition-all duration-300 text-yellow-500 font-[Inter] text-sm font-medium'
              >
                <i className='ri-external-link-line'></i>
                Visit Website
              </a>
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
                src='/serverime.png'
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
              <a
                href='https://imeroleplay.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg hover:bg-pink-500/30 transition-all duration-300 text-pink-500 font-[Inter] text-sm font-medium'
              >
                <i className='ri-external-link-line'></i>
                Visit Website
              </a>
            </div>
            {/* Glow effect on hover */}
            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'>
              <div className='absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
