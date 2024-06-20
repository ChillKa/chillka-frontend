'use client';

import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { H4, Lead } from '@components/ui/typography';
import cn from '@lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MenuItem from './MenuItem';
import menuAnimationVariants from './utils';

export type Sorts = {
  url: string;
  text: string;
};

export type SortFieldMenuProps = {
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  sorts: Sorts[];
};

const SortFieldMenu = ({
  menuOpen = false,
  onMenuOpen,
  sorts,
}: SortFieldMenuProps) => {
  const { setValue, watch } = useFormContext();
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);

  const handleSelect = (selected: ReactNode) => {
    const newValue = selected === '相關性' ? '相關性' : '日期';
    setValue('sort', newValue);
    setIsMenuOpen(false);
  };
  const currentSelect = watch('sort', '相關性');

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
        <Button
          className={cn(
            'w-[11.5rem] rounded-[0.375rem] border bg-surface text-primary shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)]',
            'hover:bg-primary hover:text-white'
          )}
        >
          <ArrowUpDown />
          排序性:<span>{currentSelect}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="relative h-[8.5rem] w-64 rounded border-0"
      >
        <motion.div
          className="absolute inset-0 rounded bg-surface"
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
            className="no-scrollbar h-full space-y-4 overflow-auto px-4 py-6 xl:py-4"
          >
            {sorts.map((item) => {
              return (
                <MenuItem
                  key={item.text}
                  value={item.text}
                  item={<Lead className="text-primary">{item.text}</Lead>}
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

export const AdvancedSortMobileField = () => {
  const { setValue, watch } = useFormContext();
  const currentSort = watch('sort', '相關性');

  const handleChange = () => {
    const newValue = currentSort === '相關性' ? '日期' : '相關性';
    setValue('sort', newValue);
  };

  return (
    <div id="sort" className="flex flex-col items-start gap-4 px-3 py-6">
      <H4>排序</H4>
      <ToggleGroup
        defaultValue="相關性"
        value={currentSort}
        onValueChange={handleChange}
        type="single"
        className="relative flex w-full gap-0"
      >
        <ToggleGroupItem
          value="相關性"
          aria-label="Toggle relevance"
          asChild
          className={cn(
            'h-12 min-w-[163.5px] flex-1 rounded-l-[0.5rem] border-[1px] border-r-0 border-primary',
            'font-bold',
            'data-[state=on]:bg-primary data-[state=on]:text-white',
            'data-[state=off]:bg-surface data-[state=off]:text-primary'
          )}
        >
          <button type="button" onClick={() => handleChange()}>
            相關性
          </button>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="日期"
          aria-label="Toggle underline"
          asChild
          className={cn(
            'h-12 min-w-[163.5px] flex-1 rounded-r-[0.5rem] border-[1px] border-l-0 border-primary',
            'font-bold',
            'data-[state=on]:bg-primary data-[state=on]:text-white',
            'data-[state=off]:bg-surface data-[state=off]:text-primary'
          )}
        >
          <button type="button" onClick={() => handleChange()}>
            日期
          </button>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default SortFieldMenu;
