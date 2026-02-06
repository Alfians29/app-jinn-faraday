import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import '../globals.css';
import 'remixicon/fonts/remixicon.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const pricedown = localFont({
  src: '../../../public/pricedown.otf',
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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${pricedown.variable}`}>
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
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
