'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Lead } from '@components/ui/typography';
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

export type Category = {
  endElement?: ReactNode;
  text: string;
};

export type CategoryFieldMenuProps = {
  side?: 'top' | 'bottom';
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
};

const CategoryFieldMenu = ({
  side = 'top',
  menuOpen = false,
  onMenuOpen,
  categories,
  value,
  onChange,
}: CategoryFieldMenuProps) => {
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
              'mb-[1px] border-b-0': side === 'bottom' && isMenuOpen,
              'mt-[1px] border-t-0': side === 'top' && isMenuOpen,
            }
          )}
          type="button"
        >
          <div className="block w-full space-y-2 border-r border-primary px-4 text-left">
            <p className="font-bold">類型</p>
            <p className="text-base text-primary">{value || '選擇活動類型'}</p>
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
          <MenuItemContainer items={categories} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export type CategoryMobileFieldMenuProps = {
  categories: Category[];
  height: number;
  menuOpen?: boolean;
  onSelected?: (isOpen: boolean) => void;
  width: number;
  onChange: (value: string) => void;
};

export const CategoryMobileFieldMenu = ({
  categories,
  height,
  menuOpen = false,
  onSelected,
  width,
  onChange,
}: CategoryMobileFieldMenuProps) => {
  const handleSelect = (selected: string) => {
    onChange(selected);
    onSelected?.(false);
  };

  return (
    <motion.div
      initial="closed"
      animate={menuOpen ? 'open' : 'closed'}
      className="absolute bottom-0 left-0 right-0 top-20 border-t border-primary bg-surface"
      variants={menuMobileAnimationVariants}
      custom={{
        size: height * 2,
        locationX: (width * 3) / 4,
        locationY: height,
      }}
    >
      <MenuItemContainer items={categories} onSelect={handleSelect} />
    </motion.div>
  );
};

export type AdvancedCategoryMobileFieldProps = {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
};

export const AdvancedCategoryMobileField = ({
  categories,
  value,
  onChange,
}: AdvancedCategoryMobileFieldProps) => {
  const handleSelect = (selected: string) => {
    const newValue = value === selected ? '' : selected;
    onChange(newValue);
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
          類型
        </AccordionTrigger>
        <AccordionContent className="">
          <RadioGroup
            className="flex flex-col gap-4"
            value={value}
            onValueChange={handleSelect}
          >
            {categories.map((category) => {
              return (
                <RadioGroupItem
                  key={category.text}
                  id={`radio-${category.text}`}
                  className="flex h-fit items-center justify-between gap-2.5 bg-surface px-4 py-2.5 transition-colors duration-300 ease-out hover:bg-primary/[0.03]"
                  value={category.text}
                >
                  <div className="flex w-full items-center justify-between">
                    <Lead className="text-primary">{category.text}</Lead>
                  </div>
                  <div className="flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <RadioGroupIndicator asChild>
                      <Circle className="h-2.5 w-2.5 fill-current text-current" />
                    </RadioGroupIndicator>
                  </div>
                </RadioGroupItem>
              );
            })}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CategoryFieldMenu;
