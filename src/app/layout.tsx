import cn from '@lib/utils';
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
            {children}
        </body>
    </html>
);

export default RootLayout;
