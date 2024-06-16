'use client';

import cn from '@lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Category } from './CategoryFieldMenu';
import MenuItemContainer from './MenuItemContainer';
import menuAnimationVariants from './utils';

export type Distance = {
  url: string;
  text: string;
};

export type DistanceFieldMenuProps = {
  side?: 'top' | 'bottom';
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  distances: Distance[];
};

const DistanceFieldMenu = ({
  side = 'top',
  menuOpen = false,
  onMenuOpen,
  distances,
}: DistanceFieldMenuProps) => {
  const { setValue, watch } = useFormContext();
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);

  const handleSelect = (category: Category['text']) => {
    setValue('distance', category);
  };
  const currentSelect = watch('distance');

  const handleOpenChange = (e: boolean) => {
    if (onMenuOpen) {
      onMenuOpen(e);
    } else {
      setIsMenuOpen(e);
    }
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          className={cn('min-w-64  pl-4 hover:cursor-pointer', {
            'mb-[1px] border-b-0': side === 'bottom' && isMenuOpen,
            'mt-[1px] border-t-0': side === 'top' && isMenuOpen,
          })}
          type="button"
        >
          <div className="block w-full space-y-2 border-r border-primary px-4 text-left">
            <p className="font-bold">距離</p>
            <p className="text-base text-primary">
              {currentSelect || '任何距離'}
            </p>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        sticky="always"
        side={side}
        align="start"
        sideOffset={0}
        className={cn(
          'relative h-[22.625rem] w-64',
          `${side === 'bottom' && 'border-b border-t-0'}`,
          `${side === 'top' && 'border-b-0 border-t'}`
        )}
      >
        <motion.div
          className="absolute inset-0 border-x border-primary bg-surface"
          variants={menuAnimationVariants}
          initial="closed"
          animate={isMenuOpen ? 'open' : 'closed'}
          custom={{ size: 1000, locationX: 128, locationY: 362 }}
        >
          <MenuItemContainer data={distances} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
export default DistanceFieldMenu;
