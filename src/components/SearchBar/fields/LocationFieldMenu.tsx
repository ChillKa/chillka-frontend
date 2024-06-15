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

export type Location = {
  url: string;
  text: string;
};

export type LocationFieldMenuProps = {
  side?: 'top' | 'bottom';
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  locations: Location[];
};

const LocationFieldMenu = ({
  side = 'top',
  menuOpen = false,
  onMenuOpen,
  locations,
}: LocationFieldMenuProps) => {
  const { setValue, watch } = useFormContext();
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);

  const handleSelect = (category: Category['text']) => {
    setIsMenuOpen(false);
    setValue('location', category);
  };
  const currentSelect = watch('location');

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
          className={cn(
            'mt-0 min-w-64 border-y border-primary py-4 pl-4 hover:cursor-pointer',
            {
              'mb-[1px] border-b-0': side === 'bottom' && isMenuOpen,
              'mt-[1px] border-t-0': side === 'top' && isMenuOpen,
            }
          )}
          type="button"
        >
          <div className="block w-full space-y-2 border-primary px-4 text-left">
            <p className="font-bold">地區</p>
            <p className="text-base text-primary">
              {currentSelect || '選擇活動地區'}
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
          'relative h-[22.625rem] w-64 border-y',
          `${side === 'bottom' && 'border-t-0'}`,
          `${side === 'top' && 'border-b-0'}`
        )}
      >
        <motion.div
          className="absolute inset-0 border-x border-primary bg-surface"
          variants={menuAnimationVariants}
          initial="closed"
          animate={isMenuOpen ? 'open' : 'closed'}
          custom={{ size: 1000, locationX: 128, locationY: 362 }}
        >
          <MenuItemContainer data={locations} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
export default LocationFieldMenu;
