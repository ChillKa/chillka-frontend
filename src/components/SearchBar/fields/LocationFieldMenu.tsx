'use client';

import cn from '@lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import MenuItemContainer from './MenuItemContainer';
import menuAnimationVariants from './utils';

export type Location = {
  url: string;
  text: string;
};

export type LocationFieldMenuProps = {
  isLocationMenuOpen: boolean;
  setIsLocationMenuOpen: Dispatch<SetStateAction<boolean>>;
  locations: Location[];
};

const LocationFieldMenu = ({
  isLocationMenuOpen,
  setIsLocationMenuOpen,
  locations,
}: LocationFieldMenuProps) => {
  return (
    <Popover onOpenChange={(e) => setIsLocationMenuOpen(() => e)}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'mt-[1px] min-w-64 border-b border-primary py-4 pl-4 hover:cursor-pointer',
            `${!isLocationMenuOpen && ' mt-0 border-t'}`
          )}
        >
          <button
            className="block w-full space-y-2 border-primary px-4 text-left"
            type="button"
          >
            <p className="font-bold">地區</p>
            <p className="text-base text-primary">選擇活動地區</p>
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
          animate={isLocationMenuOpen ? 'open' : 'closed'}
          custom={{ size: 1000, locationX: 128, locationY: 362 }}
        >
          <MenuItemContainer data={locations} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
export default LocationFieldMenu;
