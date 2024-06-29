'use client';

import cn from '@lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type NavbarItemType = {
  name: string;
  id: string;
};

type InfoNavbarProps = {
  className: string;
  data: NavbarItemType[];
};

const InfoNavbar = ({ className, data }: InfoNavbarProps) => {
  const [activeSection, setActiveSection] = useState<string>(data[0].id);
  const disableScrollHandlingRef = useRef(false);

  useEffect(() => {
    const sectionOffsets: Record<string, number> = {};
    data.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        sectionOffsets[section.id] = element.offsetTop;
      }
    });

    const handleScroll = () => {
      if (disableScrollHandlingRef.current) return;
      const scrollPosition = window.scrollY;

      data.forEach((section) => {
        const offset = sectionOffsets[section.id];
        const element = document.getElementById(section.id);

        if (
          offset &&
          element &&
          offset <= scrollPosition &&
          offset + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data]);

  const handleClick = (id: string) => {
    disableScrollHandlingRef.current = true;

    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });

    setActiveSection(id);
    setTimeout(() => {
      disableScrollHandlingRef.current = false;
    }, 1000);
  };

  return (
    <nav
      className={cn('mr-[8.375rem] hidden w-[19.125rem] xl:block', className)}
    >
      <ul className="sticky top-12 p-4">
        {data.map((section) => (
          <motion.li
            className={`mb-6 text-2xl font-bold hover:bg-primary/[0.03] ${activeSection === section.id ? 'border-l-4 border-primary pl-[1.25rem]' : 'pl-6'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={section.id}
          >
            <Link
              href={`#${section.id}`}
              onClick={() => handleClick(section.id)}
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
