'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className='w-full bg-black border-t border-yellow-500/20 py-4 md:py-8 px-4 md:px-10'>
      <div className='max-w-[1800px] mx-auto text-center'>
        <p className='text-gray-600 font-[Inter] text-xs mt-2'>
          {t('disclaimer')}
        </p>
        <p className='text-gray-600 font-[Inter] text-xs mt-1'>
          {t('notAffiliated')}
        </p>
        <p className='text-gray-600 font-[Inter] text-xs mt-1'>
          {t('roleplay')}
        </p>
      </div>
    </footer>
  );
}
