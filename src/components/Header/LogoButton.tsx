import Image from 'next/image';
import Link from 'next/link';

const LogoButton = () => (
  <Link href="/">
    <Image width={140} height={32} src="/logo.svg" alt="chillka" />
  </Link>
);

export default LogoButton;
