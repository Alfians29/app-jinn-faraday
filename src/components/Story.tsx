'use client';

import { useTranslation } from 'react-i18next';
import Particles from './Particles';

// Character data for switching
const CHARACTERS = [
  {
    id: 1,
    name: 'SOA',
    title: 'Two Wheels,',
    subtitle: 'One Brotherhood',
    image: '/arcsoa.png',
  },
  {
    id: 2,
    name: 'ALLSTAR',
    title: 'North Crown,',
    subtitle: 'Street Authority',
    image: '/arcas.png',
  },
];

interface StoryProps {
  activeCharacter: number;
  setActiveCharacter: (value: number) => void;
}

export default function Story({
  activeCharacter,
  setActiveCharacter,
}: StoryProps) {
  const { t } = useTranslation();

  return (
    <div
      id='story'
      className='w-full min-h-screen flex items-center justify-center bg-black py-10 md:py-16 px-4 md:px-10 lg:px-16 xl:px-24 2xl:px-32 relative'
    >
      <Particles />
      <div className='cntnr flex flex-col lg:flex-row items-center justify-center text-white w-full max-w-[1800px] mx-auto gap-8 lg:gap-16 relative z-10'>
        {/* Character Switch Button - Shows first on mobile */}
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

          <h1 className='text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight'>
            {activeCharacter === 0 ? t('soa.title') : t('allstar.title')}
          </h1>
          <h1 className='text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight'>
            {activeCharacter === 0 ? t('soa.subtitle') : t('allstar.subtitle')}
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
  );
}
