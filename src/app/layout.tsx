import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import 'remixicon/fonts/remixicon.css';
import I18nProvider from '@/components/I18nProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const pricedown = localFont({
  src: '../../public/pricedown.otf',
  variable: '--font-pricedown',
  display: 'block',
});

export const metadata: Metadata = {
  title: 'Story of Jinn Faraday',
  description: 'The roleplay story of Jinn Faraday in GTA V RP servers',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Story of Jinn Faraday',
    description: 'The roleplay story of Jinn Faraday in GTA V RP servers',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${inter.variable} ${pricedown.variable}`}>
      <head>
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <link rel='preload' href='/bg.png' as='image' />
        <link rel='preload' href='/sky.png' as='image' />
        <link rel='preload' href='/herobg.png' as='image' />
      </head>
      <body className='antialiased'>
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
