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

export type Event = {
  url: string;
  text: string;
};

export type EventTypeFieldMenuProps = {
  isEventTypeMenuOpen: boolean;
  setIsEventTypeMenuOpen: Dispatch<SetStateAction<boolean>>;
  events: Event[];
};

const EventTypeFieldMenu = ({
  isEventTypeMenuOpen,
  setIsEventTypeMenuOpen,
  events: dates,
}: EventTypeFieldMenuProps) => {
  const { setValue, watch } = useFormContext();

  const handleSelect = (category: Category['text']) => {
    setValue('events', category);
  };
  const currentSelect = watch('events');

  return (
    <Popover onOpenChange={(e) => setIsEventTypeMenuOpen(() => e)}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'min-w-64 border-r border-primary pl-4 hover:cursor-pointer',
            `${!isEventTypeMenuOpen && 'mt-0 '}`
          )}
        >
          <button
            className="block w-full space-y-2 border-primary px-4 text-left"
            type="button"
          >
            <p className="font-bold">形式</p>
            <p className="text-base text-primary">
              {currentSelect || '任何形式'}
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
          animate={isEventTypeMenuOpen ? 'open' : 'closed'}
          custom={{ size: 1000, locationX: 128, locationY: 362 }}
        >
          <MenuItemContainer data={dates} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
export default EventTypeFieldMenu;