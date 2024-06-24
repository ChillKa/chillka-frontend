'use client';

import { aboutAccount, aboutEventist } from '@components/Navbar/fixedData';
import { Separator } from '@components/ui/separator';
import cn from '@lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavbarProps = {
  className?: string;
};

const Navbar = ({ className }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn('text-primary', className)}>
      <ul>
        <li className="mb-6 text-xl font-bold">活動相關</li>
        {aboutEventist.map((item) => (
          <motion.li
            className={`mb-6 text-2xl font-bold hover:bg-primary/[0.03] ${pathname === item.url ? 'border-l-4 border-primary pl-[1.25rem]' : 'pl-6'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={item.title}
          >
            <Link href={item.url}>{item.title}</Link>
          </motion.li>
        ))}
        <Separator className="mb-6 h-[0.0625rem] bg-primary" />
        <li className="mb-6 text-xl font-bold">帳號相關</li>
        {aboutAccount.map((item) => (
          <motion.li
            className={`mb-6 text-2xl font-bold hover:bg-primary/[0.03] ${pathname === item.url ? 'border-l-4 border-primary pl-[1.25rem]' : 'pl-6'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={item.title}
          >
            <Link href={item.url}>{item.title}</Link>
          </motion.li>
        ))}
        <Separator className="h-[0.0625rem] bg-primary" />
      </ul>
    </nav>
  );
};

export default Navbar;
