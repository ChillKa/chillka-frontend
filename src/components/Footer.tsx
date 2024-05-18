import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/Logo.svg';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="h-[688px] px-3 py-24 text-primary xl:h-[700px] xl:pb-36 xl:pl-[312px] xl:pt-24">
      <div>
        <Link href="/">
          <Image src={logo} alt="chillka" />
        </Link>
        <div className="mt-6 text-xl font-bold">建立你的揪咖團</div>
      </div>
      <div className="my-12 xl:my-24">
        <div className="flex flex-wrap text-xl font-bold xl:text-3xl">
          <Link
            className="hidden cursor-pointer py-2.5 xl:inline-block xl:py-6"
            href="/activity"
          >
            開始揪咖
          </Link>
          <span className="mx-12 hidden py-2.5 font-thin xl:inline-block xl:py-6">
            |
          </span>
          <Link className="mr-6 py-2.5 xl:mr-12 xl:py-6" href="/explore">
            探索活動
          </Link>
          <Link className="mr-6 py-2.5 xl:mr-12 xl:py-6" href="/recommended">
            推薦活動
          </Link>
          <Link className="mr-6 py-2.5 xl:mr-12 xl:py-6" href="/faq">
            常見問題
          </Link>
          <Link
            className="mt-6 w-full py-2.5 xl:mt-0 xl:w-auto xl:py-6"
            href="/about"
          >
            關於我們
          </Link>
        </div>

        <Button
          asChild
          variant="outline"
          className="my-6 flex h-14 w-full items-center border-primary text-center text-base font-medium transition-colors hover:bg-primary hover:fill-surface hover:text-white xl:hidden"
        >
          <Link className="flex items-center justify-center" href="/activity">
            開始揪咖
            <ArrowUpRight size={16} className="ml-4" />
          </Link>
        </Button>
        <div className="my-6 text-base font-medium xl:my-4">
          <a href="mailto:qwe123456@gmail.com">qwe123456@gmail.com</a>
          <span className="mx-4">/</span>
          <a href="tel:+886212345678">(02)1234-5678</a>
        </div>
        <div className="text-base font-medium">
          <Link href="/privacy-policy">隱私權政策</Link>
          <span className="mx-4">/</span>
          <Link href="/terms-of-service">服務條款</Link>
        </div>
      </div>
      <div className="w-[341px] text-xs font-medium leading-5">
        Copyright©2024 HEX NORTH NO.9 - ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
