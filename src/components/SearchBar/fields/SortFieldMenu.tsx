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
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import MenuItem from './MenuItem';

export type Sorts = {
  url: string;
  text: string;
};

export type SortFieldMenuProps = {
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
  sorts: Sorts[];
  value: string;
  onChange: (value: string) => void;
};

const SortFieldMenu = ({
  menuOpen = false,
  onMenuOpen,
  sorts,
  value,
  onChange,
}: SortFieldMenuProps) => {
  const [, setIsMenuOpen] = useState(menuOpen);

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
        <Button
          className={cn(
            'w-[11.5rem] rounded-[0.375rem] border bg-surface text-primary',
            'hover:bg-primary hover:text-white'
          )}
        >
          <ArrowUpDown size={16} className="mr-2" />
          排序性：<span>{value}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="relative h-[8.5rem] w-64 rounded border-0 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)]"
      >
        <div className="absolute inset-0 rounded bg-surface">
          <ul className="no-scrollbar h-full space-y-4 overflow-auto px-4 py-6 xl:py-4">
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
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export type AdvancedSortMobileFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export const AdvancedSortMobileField = ({
  value,
  onChange,
}: AdvancedSortMobileFieldProps) => {
  const handleChange = () => {
    const newValue = value === '相關性' ? '日期' : '相關性';
    onChange(newValue);
  };

  return (
    <div id="sort" className="flex flex-col items-start gap-4 px-3 py-6">
      <H4>排序</H4>
      <ToggleGroup
        value={value}
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
