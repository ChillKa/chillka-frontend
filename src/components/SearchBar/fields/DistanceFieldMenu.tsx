'use client';

import cn from '@lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { Category } from './CategoryFieldMenu';
import MenuItemContainer from './MenuItemContainer';
import menuAnimationVariants from './utils';

export type Distance = {
  url: string;
  text: string;
};

export type DistanceFieldMenuProps = {
  isDistanceMenuOpen: boolean;
  setIsDistanceMenuOpen: Dispatch<SetStateAction<boolean>>;
  distances: Distance[];
};

const DistanceFieldMenu = ({
  isDistanceMenuOpen,
  setIsDistanceMenuOpen,
  distances,
}: DistanceFieldMenuProps) => {
  const { setValue, watch } = useFormContext();

  const handleSelect = (category: Category['text']) => {
    setValue('distance', category);
  };
  const currentSelect = watch('distance');

  return (
    <Popover onOpenChange={(e) => setIsDistanceMenuOpen(() => e)}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'min-w-64 border-r border-primary pl-4 hover:cursor-pointer',
            `${!isDistanceMenuOpen && 'mt-0 '}`
          )}
        >
          <button
            className="block w-full space-y-2 border-primary px-4 text-left"
            type="button"
          >
            <p className="font-bold">距離</p>
            <p className="text-base text-primary">
              {currentSelect || '任何距離'}
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
          animate={isDistanceMenuOpen ? 'open' : 'closed'}
          custom={{ size: 1000, locationX: 128, locationY: 362 }}
        >
          <MenuItemContainer data={distances} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
export default DistanceFieldMenu;
