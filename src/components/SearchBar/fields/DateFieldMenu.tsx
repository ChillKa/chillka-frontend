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
  const { setValue, watch } = useFormContext();
  const currentDate = watch('date', '');

  const handleSelect: MenuItemContainerProps['onSelect'] = (selected) => {
    const newValue = currentDate === selected ? '' : selected;
    setValue('date', newValue);
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
          日期
        </AccordionTrigger>
        <AccordionContent className="">
          <RadioGroup
            className="flex flex-col gap-4"
            value={currentDate}
            onValueChange={handleSelect}
          >
            {dates.map((date) => {
              return (
                <Button
                  key={date.text}
                  asChild
                  className="flex h-fit items-center justify-between gap-2.5 bg-surface px-4 py-2.5 transition-colors duration-300 ease-out hover:bg-primary/[0.03]"
                  onClick={() => handleSelect(date.text)}
                >
                  <div className="flex w-full items-center justify-between">
                    <Lead className="text-primary">{date.text}</Lead>
                    <RadioGroupItem
                      value={date.text}
                      id={`radio-${date.text}`}
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

export default DateFieldMenu;
