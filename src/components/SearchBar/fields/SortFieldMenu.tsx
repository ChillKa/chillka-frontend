'use client';

import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { H4 } from '@components/ui/typography';
import cn from '@lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MenuItemContainer from './MenuItemContainer';
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
    setIsMenuOpen(false);
    setValue('sort', selected);
  };
  const currentSelect = watch('sort');

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
        <Button className="rounded-[0.375rem] border bg-surface text-primary">
          <ArrowUpDown />
          排序性:<span>{currentSelect}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="relative h-[22.625rem] w-64 rounded"
      >
        <motion.div
          className="absolute inset-0 rounded bg-surface"
          variants={menuAnimationVariants}
          initial="closed"
          animate={isMenuOpen ? 'open' : 'closed'}
          custom={{ size: 1000, locationX: 128, locationY: 362 }}
        >
          <MenuItemContainer items={sorts} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export const AdvancedSortMobileField = () => {
  const { setValue } = useFormContext();

  const handleChange = (value: string) => {
    setValue('sort', value);
  };

  return (
    <div id="sort" className="flex flex-col items-start gap-4 px-3 py-6">
      <H4>排序</H4>
      <ToggleGroup
        defaultValue=""
        onValueChange={handleChange}
        type="single"
        className="flex w-full gap-0"
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
          <button type="button">相關性</button>
        </ToggleGroupItem>
        <div className="absolute left-1/2 z-10 h-12 -translate-x-1/2 transform border-l border-primary" />
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
          <button type="button">日期</button>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default SortFieldMenu;
