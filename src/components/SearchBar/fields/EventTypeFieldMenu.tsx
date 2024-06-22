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
import menuAnimationVariants from './utils';

export type Event = {
  url?: string;
  text: string;
  endElement?: ReactNode;
};

export type EventTypeFieldMenuProps = {
  side?: 'top' | 'bottom';
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  events: Event[];
  value: string;
  onChange: (value: string) => void;
};

const EventTypeFieldMenu = ({
  side = 'top',
  menuOpen = false,
  onMenuOpen,
  events: dates,
  value,
  onChange,
}: EventTypeFieldMenuProps) => {
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
          className={cn('min-w-64 py-4 pl-4 hover:cursor-pointer', {
            'mb-[1px] border-b-0': side === 'bottom' && isMenuOpen,
            'mt-[1px] border-t-0': side === 'top' && isMenuOpen,
          })}
          type="button"
        >
          <div className="block w-full space-y-2 border-r border-primary px-4 text-left">
            <p className="font-bold">形式</p>
            <p className="text-base text-primary">{value || '任何形式'}</p>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        sticky="always"
        side={side}
        align="start"
        sideOffset={0}
        className={cn(
          'relative h-[10rem] w-64',
          `${side === 'bottom' && 'mt-[-0.5rem] border-b border-t-0'}`,
          `${side === 'top' && 'mb-[0.5rem] border-b-0 border-t'}`
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

export type AdvancedEventTypeMobileFieldProps = {
  events: Event[];
  value: string;
  onChange: (value: string) => void;
};
export const AdvancedEventTypeMobileField = ({
  events,
  value,
  onChange,
}: AdvancedEventTypeMobileFieldProps) => {
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
            'min-w-[21.9375rem] border-0 hover:no-underline'
          )}
        >
          <H4>形式</H4>
        </AccordionTrigger>
        <AccordionContent className="">
          <RadioGroup
            className="flex flex-col gap-4"
            value={value}
            onValueChange={handleSelect}
          >
            {events.map((event) => {
              return (
                <RadioGroupItem
                  key={event.text}
                  id={`radio-${event.text}`}
                  className="flex h-fit items-center justify-between gap-2.5 bg-surface px-4 py-2.5 transition-colors duration-300 ease-out hover:bg-primary/[0.03]"
                  value={event.text}
                >
                  <div className="flex w-full items-center justify-between">
                    <Lead className="text-primary">{event.text}</Lead>
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

export default EventTypeFieldMenu;
