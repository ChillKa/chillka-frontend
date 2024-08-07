import Image from 'next/image';
import Link from 'next/link';

const LogoButton = () => (
  <Link href="/">
    <Image
      width={140}
      height={32}
      src="/logo.svg"
      priority
      alt="chillka logo"
    />
  </Link>
);

export default LogoButton;
