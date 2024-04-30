import Footer from '@components/Footer';
import Header from '@components/Header';
import { Toaster } from '@components/ui/toaster';
import cn from '@lib/utils';
import AuthProvider from '@store/AuthProvider/AuthProvider';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
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
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <AuthProvider>
        <Header />
        <main className="debug min-h-[calc(100vh-var(--header-height)-var(--footer-height))]">
          {children}
          <Toaster />
        </main>
        <Footer />
      </AuthProvider>
    </body>
  </html>
);

export default RootLayout;
