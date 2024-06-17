'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import cn from '@lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MenuItemContainer, { MenuItemContainerProps } from './MenuItemContainer';
import menuAnimationVariants from './utils';

export type Date = {
  url?: string;
  text: string;
  endElement?: ReactNode;
};

export type DateFieldMenuProps = {
  side?: 'top' | 'bottom';
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  dates: Date[];
};

const DateFieldMenu = ({
  side = 'top',
  menuOpen = false,
  onMenuOpen,
  dates,
}: DateFieldMenuProps) => {
  const { setValue, watch } = useFormContext();
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);

  const handleSelect = (selected: ReactNode) => {
    setIsMenuOpen(false);
    setValue('date', selected);
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
        <button
          className={cn('min-w-64 py-4 pl-4 hover:cursor-pointer', {
            'mb-[1px] border-b-0': side === 'bottom' && isMenuOpen,
            'mt-[1px] border-t-0': side === 'top' && isMenuOpen,
          })}
          type="button"
        >
          <div className="block w-full space-y-2  border-r border-primary px-4 text-left">
            <p className="font-bold">日期</p>
            <p className="text-base text-primary">
              {currentSelect || '任何日期'}
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
          <MenuItemContainer items={dates} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export type AdvancedDateMobileFieldProps = {
  dates: Date[];
  onSelect?: (value: string | number) => void;
};

export const AdvancedDateMobileField = ({
  dates,
  onSelect,
}: AdvancedDateMobileFieldProps) => {
  const { setValue } = useFormContext();

  const handleSelect: MenuItemContainerProps['onSelect'] = (selected) => {
    setValue('date', selected);
    onSelect?.(selected);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={cn(
            ' bg-surface px-3 py-6',
            'min-w-[21.9375rem] border-0 text-xl font-bold '
          )}
        >
          日期
        </AccordionTrigger>
        <AccordionContent className="">
          <MenuItemContainer items={dates} onSelect={handleSelect} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DateFieldMenu;
