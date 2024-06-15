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

export type Date = {
  url: string;
  text: string;
};

export type DateFieldMenuProps = {
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  dates: Date[];
};

const DateFieldMenu = ({
  menuOpen = false,
  onMenuOpen,
  dates,
}: DateFieldMenuProps) => {
  const { setValue, watch } = useFormContext();
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);

  const handleSelect = (category: Category['text']) => {
    setValue('date', category);
  };
  const currentSelect = watch('date');

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
            'min-w-64 border-r border-primary pl-4 hover:cursor-pointer',
            `${!isMenuOpen && 'mt-0 '}`
          )}
        >
          <button
            className="block w-full space-y-2 border-primary px-4 text-left"
            type="button"
          >
            <p className="font-bold">日期</p>
            <p className="text-base text-primary">
              {currentSelect || '任何日期'}
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
          <MenuItemContainer data={dates} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
export default DateFieldMenu;
