'use client';

import cn from '@lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MenuItemContainer from './MenuItemContainer';
import menuAnimationVariants from './utils';

export type Category = {
  icon: LucideIcon;
  url: string;
  text: string;
};

export type CategoryFieldMenuProps = {
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  categories: Category[];
};

const CategoryFieldMenu = ({
  menuOpen = false,
  onMenuOpen,
  categories,
}: CategoryFieldMenuProps) => {
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
            'mt-[1px] min-w-64 border-b border-primary py-4 pl-4  hover:cursor-pointer',
            `${!isMenuOpen && ' mt-0 border-t'}`
          )}
        >
          <button
            className="block w-full space-y-2 border-r border-primary px-4 text-left"
            type="button"
          >
            <p className="font-bold">類型</p>
            <p className="text-base text-primary">
              {currentSelect || '選擇活動類型'}
            </p>
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        sticky="always"
        side="top"
        align="start"
        sideOffset={0}
        className="h-[22.625rem] w-64"
      >
        <motion.div
          className="absolute inset-0 border-x border-t border-primary bg-surface"
          variants={menuAnimationVariants}
          initial="closed"
          animate={isMenuOpen ? 'open' : 'closed'}
          custom={{ size: 1000, locationX: 128, locationY: 362 }}
        >
          <MenuItemContainer data={categories} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
export default CategoryFieldMenu;
