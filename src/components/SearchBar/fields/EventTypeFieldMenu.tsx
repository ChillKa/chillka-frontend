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
};

const EventTypeFieldMenu = ({
  side = 'top',
  menuOpen = false,
  onMenuOpen,
  events: dates,
}: EventTypeFieldMenuProps) => {
  const { setValue, watch } = useFormContext();
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);

  const handleSelect = (selected: ReactNode) => {
    setIsMenuOpen(false);
    setValue('type', selected);
  };
  const currentSelect = watch('type');

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
          className={cn('min-w-64 pl-4 hover:cursor-pointer', {
            'mb-[1px] border-b-0': side === 'bottom' && isMenuOpen,
            'mt-[1px] border-t-0': side === 'top' && isMenuOpen,
          })}
          type="button"
        >
          <div className="block w-full space-y-2 border-r border-primary px-4 text-left">
            <p className="font-bold">形式</p>
            <p className="text-base text-primary">
              {currentSelect || '任何形式'}
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
          <MenuItemContainer items={dates} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export type AdvancedEventTypeMobileFieldProps = {
  events: Event[];
  onSelect?: (value: string | number) => void;
};
export const AdvancedEventTypeMobileField = ({
  events,
  onSelect,
}: AdvancedEventTypeMobileFieldProps) => {
  const { setValue, watch } = useFormContext();
  const currentEventType = watch('type', '');

  const handleSelect: MenuItemContainerProps['onSelect'] = (selected) => {
    const newValue = currentEventType === selected ? '' : selected;
    setValue('type', newValue);
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
          形式
        </AccordionTrigger>
        <AccordionContent className="">
          <RadioGroup
            className="flex flex-col gap-4"
            value={currentEventType}
            onValueChange={handleSelect}
          >
            {events.map((event) => {
              return (
                <Button
                  key={event.text}
                  asChild
                  className="flex h-fit items-center justify-between gap-2.5 bg-surface px-4 py-2.5 transition-colors duration-300 ease-out hover:bg-primary/[0.03]"
                  onClick={() => handleSelect(event.text)}
                >
                  <div className="flex w-full items-center justify-between">
                    <Lead className="text-primary">{event.text}</Lead>
                    <RadioGroupItem
                      value={event.text}
                      id={`radio-${event.text}`}
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

export default EventTypeFieldMenu;
