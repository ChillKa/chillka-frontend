import Footer from '@components/Footer';
import Header from '@components/Header';
import { Toaster } from '@components/ui/toaster';
import cn from '@lib/utils';
import AuthProvider from '@store/AuthProvider/AuthProvider';
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
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="zh-tw">
    <body
      className={cn(
        'm-0 h-full min-h-screen w-full bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <AuthProvider>
        <Header />
        <main className="min-h-[calc(100vh-var(--header-height)-var(--footer-height))]">
          {children}
          <Toaster />
        </main>
        <Footer className="mx-auto" />
      </AuthProvider>
    </body>
  </html>
);

export default RootLayout;
