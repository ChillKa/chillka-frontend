'use client';

import cn from '@lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import MenuItemContainer from '../MenuItemContainer';
import menuAnimationVariants from './utils';

export type Category = {
  icon: LucideIcon;
  url: string;
  text: string;
};

export type CategoryFieldMenuProps = {
  isCategoryMenuOpen: boolean;
  setIsCategoryMenuOpen: Dispatch<SetStateAction<boolean>>;
  categories: Category[];
};

const CategoryFieldMenu = ({
  isCategoryMenuOpen,
  setIsCategoryMenuOpen,
  categories,
}: CategoryFieldMenuProps) => {
  return (
    <Popover onOpenChange={(e) => setIsCategoryMenuOpen(() => e)}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'mt-[1px] min-w-64 border-b border-primary py-4 pl-4  hover:cursor-pointer',
            `${!isCategoryMenuOpen && ' mt-0 border-t'}`
          )}
        >
          <button
            className="block w-full space-y-2 border-r border-primary px-4 text-left"
            type="button"
          >
            <p className="font-bold">類型</p>
            <p className="text-base text-primary">選擇活動類型</p>
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
          animate={isCategoryMenuOpen ? 'open' : 'closed'}
          custom={{ size: 1000, locationX: 128, locationY: 362 }}
        >
          <MenuItemContainer data={categories} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
export default CategoryFieldMenu;
