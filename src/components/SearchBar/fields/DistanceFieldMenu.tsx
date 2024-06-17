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

export type Distance = {
  url?: string;
  text: string;
  endElement?: ReactNode;
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

  const handleSelect = (selected: ReactNode) => {
    setIsMenuOpen(false);
    setValue('distance', selected);
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
          <MenuItemContainer items={distances} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export type AdvancedDistanceMobileFieldProps = {
  distances: Distance[];
  onSelect?: (value: string | number) => void;
};

export const AdvancedDistanceMobileField = ({
  distances,
  onSelect,
}: AdvancedDistanceMobileFieldProps) => {
  const { setValue } = useFormContext();

  const handleSelect: MenuItemContainerProps['onSelect'] = (selected) => {
    setValue('distance', selected);
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
          距離
        </AccordionTrigger>
        <AccordionContent className="">
          <MenuItemContainer items={distances} onSelect={handleSelect} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DistanceFieldMenu;
