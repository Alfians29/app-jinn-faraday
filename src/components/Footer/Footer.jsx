import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default Footer;
