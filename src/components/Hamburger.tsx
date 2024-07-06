'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import cn from '@lib/utils';
import { SVGMotionProps, motion } from 'framer-motion';
import { User } from 'lucide-react';

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
  userName: string;
  userAvatar: string;
};

const Hamburger = ({
  isOpen,
  isLoggedin,
  className = '',
  userName,
  userAvatar,
}: HamburgerProps) => {
  const firstLetter = userName.charAt(0);

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
              closed: { d: 'M 4 6 L 20 6' },
              open: { d: 'M 6 18 L 18 6' },
            }}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
          />
          <Path
            d="M 4 12 L 20 12"
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
              closed: { d: 'M 4 18 L 20 18' },
              open: { d: 'M 6 6 L 18 18' },
            }}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
          />
        </svg>
      </div>
      {!isLoggedin ? (
        <User className="ml-2 size-10 rounded-full bg-slate-100 p-2" />
      ) : (
        <Avatar className="ml-2 h-10 w-10">
          <AvatarImage
            className="h-auto w-full object-cover"
            src={userAvatar}
          />
          <AvatarFallback className="bg-primary-light text-white">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Hamburger;
