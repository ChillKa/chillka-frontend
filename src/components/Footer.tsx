'use client';

import LogoButton from '@components/LogoButton';
import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import FooterMenu from './FooterMenu';

type FooterProps = {
  className: string;
};

const SITEMAP = [
  {
    name: '探索活動',
    url: '/search',
  },
  {
    name: '推薦活動',
    url: '/search',
  },
  {
    name: '常見問題',
    url: '/faq',
  },
  {
    name: '關於我們',
    url: '/about',
  },
];

const Footer = ({ className }: FooterProps) => {
  const { isLoggedin } = useAuthContext();

  return (
    <>
      <div className="border-t" />
      <footer
        className={cn(
          'space-y-12 px-3 py-24 text-primary xl:max-w-[81rem] xl:space-y-24 xl:px-0 xl:pb-36',
          className
        )}
      >
        <div className="space-y-6">
          <LogoButton />
          <div className="text-xl font-bold">建立你的揪咖團</div>
        </div>
        <div className="space-y-6 xl:space-y-4">
          <div className="flex flex-wrap gap-6 text-xl font-bold xl:gap-12 xl:text-3xl">
            <FooterMenu
              url={isLoggedin ? '/activity/new' : '/auth/login'}
              name="開始揪咖"
              className="hidden"
            />
            <span className="hidden font-thin xl:inline-block xl:py-6">|</span>
            {SITEMAP.map((item) => (
              <FooterMenu
                key={item.name}
                url={item.url}
                name={item.name}
                className=""
              />
            ))}
          </div>

          <Button
            asChild
            variant="outline"
            className="flex h-14 w-full items-center border-primary text-center text-base font-medium transition-colors hover:bg-primary hover:fill-surface hover:text-surface xl:hidden"
          >
            <Link
              href={isLoggedin ? '/activity/new' : '/auth/login'}
              className="flex items-center justify-center gap-4"
            >
              開始揪咖
              <ArrowUpRight size={16} />
            </Link>
          </Button>
          <div className="space-x-4 text-base font-medium">
            <a href="mailto:chillka.offical@gmail.com">
              chillka.offical@gmail.com
            </a>
            <span>/</span>
            <a href="tel:+886212345678">(02)1234-5678</a>
          </div>
          <div className="space-x-4 text-base font-medium">
            <Link href="/privacy-policy">隱私權政策</Link>
            <span>/</span>
            <Link href="/terms-of-service">服務條款</Link>
          </div>
        </div>
        <div className="text-xs/5 font-medium">
          Copyright©2024 HEX NORTH NO.9 - ALL RIGHTS RESERVED.
        </div>
      </footer>
    </>
  );
};

export default Footer;
