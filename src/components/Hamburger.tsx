'use client';

import cn from '@lib/utils';
import { SVGMotionProps, motion } from 'framer-motion';
import Image from 'next/image';

const defaultAvatar = '/header__defaultAvatar.svg';
const fakeAvatar = '/header__fakeAvatar.svg';

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="#403E3D"
    strokeLinecap="round"
    {...props}
  />
);

type HamburgerProps = {
  isOpen: boolean;
  isLoggedin: boolean;
  className?: string;
};

const Hamburger = ({ isOpen, isLoggedin, className = '' }: HamburgerProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-surface p-3 ',
        isOpen ? 'mx-0 border-4' : 'mx-[0.1875rem] border border-primary',
        className
      )}
    >
      <div className="p-2">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <Path
            variants={{
              closed: { d: 'M 3 6 L 21 6' },
              open: { d: 'M 3 18 L 21 6' },
            }}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
          />
          <Path
            d="M 3 12 L 21 12"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
          />
          <Path
            variants={{
              closed: { d: 'M 3 18 L 21 18' },
              open: { d: 'M 3 6 L 21 18' },
            }}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
          />
        </svg>
      </div>
      <Image
        className="ml-2"
        src={isLoggedin ? fakeAvatar : defaultAvatar}
        alt="user"
        width={40}
        height={40}
      />
    </div>
  );
};

export default Hamburger;
