import { aboutAccount, aboutEventist } from '@components/Navbar/fixedData';
import { Separator } from '@components/ui/separator';
import cn from '@lib/utils';
import Link from 'next/link';

type NavbarProps = {
  className?: string;
};

const Navbar = ({ className }: NavbarProps) => {
  return (
    <nav className={cn('text-primary', className)}>
      <ul>
        <li className="mb-6 text-xl font-bold">活動相關</li>
        {aboutEventist.map((item) => (
          <li
            className="mb-6 pl-6 text-2xl font-bold hover:bg-primary/[0.03]"
            key={item.title}
          >
            <Link href={item.url}>{item.title}</Link>
          </li>
        ))}
        <Separator className="mb-6 h-[0.0625rem] bg-primary" />
        <li className="mb-6 text-xl font-bold">帳號相關</li>
        {aboutAccount.map((item) => (
          <li
            className="mb-6 pl-6 text-2xl font-bold hover:bg-primary/[0.03]"
            key={item.title}
          >
            <Link href={item.url}>{item.title}</Link>
          </li>
        ))}
        <Separator className="h-[0.0625rem] bg-primary" />
      </ul>
    </nav>
  );
};

export default Navbar;
