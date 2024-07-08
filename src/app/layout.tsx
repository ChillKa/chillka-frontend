import Footer from '@components/Footer';
import Header from '@components/Header';
import { Toaster } from '@components/ui/toaster';
import cn from '@lib/utils';
import AuthProvider from '@store/AuthProvider/AuthProvider';
import { GoogleMapsProvider } from '@store/GoogleMapsProvider';
import type { Metadata } from 'next';
import { Noto_Sans_TC as FontSans } from 'next/font/google';
import React from 'react';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'chillka',
  description: '一起揪咖，探索你的活動時光！',
  metadataBase: new URL('https://chillka-frontend.vercel.app'),
  openGraph: {
    title: 'chillka',
    description: '一起揪咖，探索你的活動時光！',
    url: 'https://chillka-frontend.vercel.app',
    siteName: 'chillka',
    images: [
      {
        url: '/ogimage.png',
        width: 1294,
        height: 693,
        alt: 'chillka 無聊想找伴或參加活動嗎？一起揪咖，探索你的活動時光！',
      },
    ],
    locale: 'zh_tw',
    type: 'website',
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html className="scroll-smooth" lang="zh-tw">
    <body
      className={cn(
        'm-0 h-full min-h-screen w-full bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <AuthProvider>
        <GoogleMapsProvider>
          <Header />
          <main className="min-h-[calc(100vh-var(--header-height)-var(--footer-height))]">
            {children}
            <Toaster />
          </main>
          <Footer className="mx-auto" />
        </GoogleMapsProvider>
      </AuthProvider>
    </body>
  </html>
);

export default RootLayout;
