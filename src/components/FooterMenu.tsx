import cn from '@lib/utils';
import Link from 'next/link';

type FooterMenuProps = {
  url: string;
  name: string;
  className: string;
};

const FooterMenu = ({ url, name, className }: FooterMenuProps) => {
  return (
    <Link
      className={cn(
        'relative py-2.5 after:absolute after:bottom-0 after:left-0 after:block after:w-full after:border-b-2 after:border-primary after:opacity-0 after:transition-opacity after:duration-300 after:ease-out hover:after:opacity-100 xl:inline-block xl:py-6',
        className
      )}
      href={url}
    >
      {name}
    </Link>
  );
};

export default FooterMenu;
