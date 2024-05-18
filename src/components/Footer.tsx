import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/Logo.svg';

type FooterProps = {
  className: string;
};

const SITEMAP = [
  {
    name: '探索活動',
    url: '/explore',
  },
  {
    name: '推薦活動',
    url: '/recommended',
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
  return (
    <footer
      className={cn(
        'space-y-12 px-3 py-24 text-primary xl:space-y-24',
        className
      )}
    >
      <div className="space-y-6">
        <Link href="/">
          <Image src={logo} alt="chillka" />
        </Link>
        <div className="text-xl font-bold">建立你的揪咖團</div>
      </div>
      <div className="space-y-6 xl:space-y-4">
        <div className="flex flex-wrap gap-6 text-xl font-bold xl:gap-12 xl:text-3xl">
          <Link
            className="hidden py-2.5 xl:inline-block xl:py-6"
            href="/activity"
          >
            開始揪咖
          </Link>
          <span className="hidden font-thin xl:inline-block xl:py-6">|</span>
          {SITEMAP.map((item) => (
            <Link key={item.name} className="py-2.5 xl:py-6" href={item.url}>
              {item.name}
            </Link>
          ))}
        </div>

        <Button
          asChild
          variant="outline"
          className="flex h-14 w-full items-center border-primary text-center text-base font-medium transition-colors hover:bg-primary hover:fill-surface hover:text-surface xl:hidden"
        >
          <Link
            className="flex items-center justify-center gap-4"
            href="/activity"
          >
            開始揪咖
            <ArrowUpRight size={16} />
          </Link>
        </Button>
        <div className="space-x-4 text-base font-medium">
          <a href="mailto:qwe123456@gmail.com">qwe123456@gmail.com</a>
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
  );
};

export default Footer;
