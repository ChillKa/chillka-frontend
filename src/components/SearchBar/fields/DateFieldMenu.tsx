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
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CalendarDialog from './CalendarDialog';
import MenuItem from './MenuItem';
import { MenuItemContainerProps } from './MenuItemContainer';
import menuAnimationVariants from './utils';

export type DateItem = {
  url?: string;
  text: string;
  endElement?: ReactNode;
};

export type DateFieldMenuProps = {
  side?: 'top' | 'bottom';
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  dates: DateItem[];
};

const DateFieldMenu = ({
  side = 'top',
  menuOpen = false,
  onMenuOpen,
  dates,
}: DateFieldMenuProps) => {
  const { setValue, watch } = useFormContext();
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);

  const handleSelect = (selected: ReactNode) => {
    setIsMenuOpen(false);
    setValue('date', selected);
  };
  const currentSelect = watch('date');

  useEffect(() => {
    if (!currentSelect) {
      setCustomDate(undefined);
    }
  }, [currentSelect]);

  const handleOpenChange = (e: boolean) => {
    if (onMenuOpen) {
      onMenuOpen(e);
    } else {
      setIsMenuOpen(e);
    }
  };

  const handleCustomDateSelect = (date?: Date) => {
    if (date) {
      setCustomDate(date);
      const formattedDate = format(date, 'PPP');
      setValue('date', formattedDate);
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
          <motion.ul
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.6 },
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
            }}
            className="no-scrollbar h-[calc(100%-4.5rem)] space-y-4 overflow-auto px-4 py-6 xl:h-full xl:py-4"
          >
            {dates.map((date) => {
              if (date.text === '自訂日期') {
                return (
                  <CalendarDialog
                    key={date.text}
                    triggerElement={
                      <Button
                        variant="outline"
                        className="w-[280px] justify-start text-left font-normal"
                      >
                        <motion.li
                          variants={{
                            open: {
                              y: 0,
                              opacity: 1,
                              transition: {
                                y: { stiffness: 1000, velocity: -100 },
                              },
                            },
                            closed: {
                              y: 30,
                              opacity: 0,
                              transition: {
                                y: { stiffness: 1000 },
                              },
                            },
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex w-full items-center justify-between"
                        >
                          {customDate ? (
                            <Lead className="text-primary">
                              {format(customDate, 'PPP')}
                            </Lead>
                          ) : (
                            <Lead className="text-primary">自訂日期</Lead>
                          )}
                        </motion.li>
                      </Button>
                    }
                    selectedDate={customDate}
                    onSelect={handleCustomDateSelect}
                  />
                );
              }
              return (
                <MenuItem
                  key={date.text}
                  value={date.text}
                  item={<Lead className="text-primary">{date.text}</Lead>}
                  endElement={date.endElement}
                  onSelect={handleSelect}
                />
              );
            })}
          </motion.ul>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export type AdvancedDateMobileFieldProps = {
  dates: DateItem[];
  onSelect?: (value: string | number) => void;
};

export const AdvancedDateMobileField = ({
  dates,
  onSelect,
}: AdvancedDateMobileFieldProps) => {
  const { setValue, watch } = useFormContext();
  const currentSelect = watch('date', '');
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!currentSelect) {
      setCustomDate(undefined);
    }
  }, [currentSelect]);

  const handleSelect: MenuItemContainerProps['onSelect'] = (selected) => {
    const newValue = currentSelect === selected ? '' : selected;
    setValue('date', newValue);
    onSelect?.(newValue);
  };

  const handleCustomDateSelect = (date?: Date) => {
    if (date) {
      setCustomDate(date);
      const formattedDate = format(date, 'PPP');
      setValue('date', formattedDate);
    }
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
            value={currentSelect}
            onValueChange={handleSelect}
          >
            {dates.map((date) => {
              if (date.text === '自訂日期') {
                return (
                  <CalendarDialog
                    key={date.text}
                    triggerElement={
                      <Button
                        asChild
                        className="flex h-fit items-center justify-between gap-2.5 bg-surface px-4 py-2.5 transition-colors duration-300 ease-out hover:bg-primary/[0.03]"
                      >
                        <div className="flex w-full items-center justify-between">
                          {customDate ? (
                            <Lead className="text-primary">
                              {format(customDate, 'PPP')}
                            </Lead>
                          ) : (
                            <Lead className="text-primary">自訂日期</Lead>
                          )}
                          <RadioGroupItem
                            value={date.text}
                            id={`radio-${date.text}`}
                          />
                        </div>
                      </Button>
                    }
                    selectedDate={customDate}
                    onSelect={handleCustomDateSelect}
                  />
                );
              }

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
