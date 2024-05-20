'use client';

import logo from '@public/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const LogoButton = () => (
  <Link href="/">
    <Image className="h-[32px] w-[140px]" src={logo} alt="chillka" />
  </Link>
);

export default LogoButton;
