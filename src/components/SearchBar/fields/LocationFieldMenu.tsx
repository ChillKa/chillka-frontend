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
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  locations: Location[];
};

const LocationFieldMenu = ({
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
        <div
          className={cn(
            'mt-[1px] min-w-64 border-b border-primary py-4 pl-4 hover:cursor-pointer',
            `${!isMenuOpen && ' mt-0 border-t'}`
          )}
        >
          <button
            className="block w-full space-y-2 border-primary px-4 text-left"
            type="button"
          >
            <p className="font-bold">地區</p>
            <p className="text-base text-primary">
              {currentSelect || '選擇活動地區'}
            </p>
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        sticky="always"
        side="top"
        align="start"
        sideOffset={0}
        className="relative h-[22.625rem] w-64"
      >
        <motion.div
          className="absolute inset-0 border-x border-t border-primary bg-surface"
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
