'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Button } from '@components/ui/button';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Lead } from '@components/ui/typography';
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

export type Category = {
  endElement?: ReactNode;
  text: string;
};

export type CategoryFieldMenuProps = {
  side?: 'top' | 'bottom';
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  categories: Category[];
};

const CategoryFieldMenu = ({
  side = 'top',
  menuOpen = false,
  onMenuOpen,
  categories,
}: CategoryFieldMenuProps) => {
  const { setValue, watch } = useFormContext();
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);

  const handleSelect = (slected: ReactNode) => {
    setIsMenuOpen(false);
    setValue('category', slected);
  };
  const currentSelect = watch('category');

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
            <p className="text-base text-primary">
              {currentSelect || '選擇活動類型'}
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
};

export const CategoryMobileFieldMenu = ({
  categories,
  height,
  menuOpen = false,
  onSelected,
  width,
}: CategoryMobileFieldMenuProps) => {
  const { setValue } = useFormContext();

  const handleSelect = (selected: ReactNode) => {
    setValue('category', selected);
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
  onSelect?: (value: string | number) => void;
};

export const AdvancedCategoryMobileField = ({
  categories,
  onSelect,
}: AdvancedCategoryMobileFieldProps) => {
  const { setValue, watch } = useFormContext();
  const currentCategory = watch('category', '');

  const handleSelect: MenuItemContainerProps['onSelect'] = (selected) => {
    const newValue = currentCategory === selected ? '' : selected;
    setValue('category', newValue);
    onSelect?.(newValue);
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
            value={currentCategory}
            onValueChange={handleSelect}
          >
            {categories.map((category) => {
              return (
                <Button
                  key={category.text}
                  asChild
                  className="flex h-fit items-center justify-between gap-2.5 bg-surface px-4 py-2.5 transition-colors duration-300 ease-out hover:bg-primary/[0.03]"
                  onClick={() => handleSelect(category.text)}
                >
                  <div className="flex w-full items-center justify-between">
                    <Lead className="text-primary">{category.text}</Lead>
                    <RadioGroupItem
                      value={category.text}
                      id={`radio-${category.text}`}
                    />
                  </div>
                </Button>
              );
            })}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CategoryFieldMenu;
