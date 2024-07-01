'use client';

import useScrollspy from '@hooks/use-scroll-spy';
import cn from '@lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

type NavbarItemType = {
  name: string;
  id: string;
};

type InfoNavbarProps = {
  className: string;
  data: NavbarItemType[];
};

const InfoNavbar = ({ className, data }: InfoNavbarProps) => {
  const ids = data.map((item) => item.id);
  const headerHeight = 144;
  const activeId = useScrollspy(ids, headerHeight);

  const handleClick = (
    id: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -headerHeight;
      const yPosition =
        section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn('mr-[8.375rem] hidden w-[19.125rem] xl:block', className)}
    >
      <ul className="sticky top-12 p-4">
        {data.map((section) => (
          <motion.li
            className={`mb-6 text-2xl font-bold hover:bg-primary/[0.03] ${activeId === section.id ? 'border-l-4 border-primary pl-[1.25rem]' : 'pl-6'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={section.id}
          >
            <Link
              href={`#${section.id}`}
              onClick={(e) => handleClick(section.id, e)}
            >
              {section.name}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default InfoNavbar;
