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
import menuAnimationVariants, { menuMobileAnimationVariants } from './utils';

export type Location = {
  url?: string;
  text: string;
  endElement?: ReactNode;
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

  const handleSelect = (selected: ReactNode) => {
    setIsMenuOpen(false);
    setValue('location', selected);
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
          <MenuItemContainer items={locations} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export type LocationMobileFieldMenuProps = {
  locations: {
    url: string;
    text: string;
  }[];
  height: number;
  menuOpen?: boolean;
  onSelected?: (isOpen: boolean) => void;
  width: number;
};

export const LocationMobileFieldMenu = ({
  locations,
  height,
  menuOpen = false,
  onSelected,
  width,
}: LocationMobileFieldMenuProps) => {
  const { setValue } = useFormContext();

  const handleSelect = (selected: ReactNode) => {
    setValue('location', selected);
    onSelected?.(false);
  };

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 top-20 border-t border-primary bg-surface"
      variants={menuMobileAnimationVariants}
      initial="closed"
      animate={menuOpen ? 'open' : 'closed'}
      custom={{
        size: height * 2,
        locationX: width / 4,
        locationY: height,
      }}
    >
      <MenuItemContainer items={locations} onSelect={handleSelect} />
    </motion.div>
  );
};

export type AdvancedLocationMobileFieldProps = {
  locations: Location[];
  onSelect?: (value: string | number) => void;
};

export const AdvancedLocationMobileField = ({
  locations,
  onSelect,
}: AdvancedLocationMobileFieldProps) => {
  const { setValue } = useFormContext();

  const handleSelect: MenuItemContainerProps['onSelect'] = (selected) => {
    setValue('location', selected);
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
          地區
        </AccordionTrigger>
        <AccordionContent className="">
          <MenuItemContainer items={locations} onSelect={handleSelect} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LocationFieldMenu;
