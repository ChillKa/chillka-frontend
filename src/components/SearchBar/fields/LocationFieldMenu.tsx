'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { H4, Lead } from '@components/ui/typography';
import cn from '@lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@radix-ui/react-radio-group';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';
import { ReactNode, useState } from 'react';
import MenuItemContainer from './MenuItemContainer';
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
  value: string;
  onChange: (value: string) => void;
};

const LocationFieldMenu = ({
  side = 'top',
  menuOpen = false,
  onMenuOpen,
  locations,
  value,
  onChange,
}: LocationFieldMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);

  const handleSelect = (selected: string) => {
    setIsMenuOpen(false);
    onChange(selected);
  };

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
              'border-b-0': side === 'bottom' && isMenuOpen,
              'mt-[1px] border-t-0': side === 'top' && isMenuOpen,
            }
          )}
          type="button"
        >
          <div className="block w-full space-y-2 border-primary px-4 text-left">
            <p className="font-bold">地區</p>
            <p className="text-base text-primary">{value || '選擇活動地區'}</p>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        sticky="always"
        side={side}
        align="start"
        sideOffset={0}
        className={cn(
          'relative z-30 h-[22.625rem] w-64 border-y',
          `${side === 'bottom' && 'mt-[-0.5rem] border-t-0'}`,
          `${side === 'top' && 'mb-[0.5rem] border-b-0'}`
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
  locations: Location[];
  height: number;
  menuOpen?: boolean;
  onSelected?: (isOpen: boolean) => void;
  width: number;
  onChange: (value: string) => void;
};

export const LocationMobileFieldMenu = ({
  locations,
  height,
  menuOpen = false,
  onSelected,
  width,
  onChange,
}: LocationMobileFieldMenuProps) => {
  const handleSelect = (selected: string) => {
    onChange(selected);
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
  value: string;
  onChange: (value: string) => void;
};

export const AdvancedLocationMobileField = ({
  locations,
  value,
  onChange,
}: AdvancedLocationMobileFieldProps) => {
  const handleSelect = (selected: string) => {
    const newValue = value === selected ? '' : selected;
    onChange(newValue);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="location">
        <AccordionTrigger
          className={cn(
            ' bg-surface px-3 py-6',
            'min-w-[21.9375rem] border-0 hover:no-underline'
          )}
        >
          <H4>地區</H4>
        </AccordionTrigger>
        <AccordionContent className="">
          <RadioGroup
            key={value}
            className="flex flex-col gap-4"
            value={value}
            onValueChange={handleSelect}
          >
            {locations.map((location) => (
              <RadioGroupItem
                key={location.text}
                id={`radio-${location.text}`}
                className="flex h-fit items-center justify-between gap-2.5 bg-surface px-4 py-2.5 transition-colors duration-300 ease-out hover:bg-primary/[0.03]"
                value={location.text}
              >
                <div className="flex w-full items-center justify-between">
                  <Lead className="text-primary">{location.text}</Lead>
                </div>
                <div className="flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <RadioGroupIndicator asChild>
                    <Circle className="h-2.5 w-2.5 fill-current text-current" />
                  </RadioGroupIndicator>
                </div>
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LocationFieldMenu;
