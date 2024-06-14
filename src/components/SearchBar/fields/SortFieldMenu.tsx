'use client';

import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { Category } from './CategoryFieldMenu';
import MenuItemContainer from './MenuItemContainer';
import menuAnimationVariants from './utils';

export type Sorts = {
  url: string;
  text: string;
};

export type SortFieldMenuProps = {
  isSortMenuOpen: boolean;
  setIsSortMenuOpen: Dispatch<SetStateAction<boolean>>;
  sorts: Sorts[];
};

const SortFieldMenu = ({
  isSortMenuOpen,
  setIsSortMenuOpen,
  sorts,
}: SortFieldMenuProps) => {
  const { setValue, watch } = useFormContext();

  const handleSelect = (category: Category['text']) => {
    setValue('sort', category);
  };
  const currentSelect = watch('sort');

  return (
    <Popover onOpenChange={(e) => setIsSortMenuOpen(() => e)}>
      <PopoverTrigger asChild>
        <Button className="rounded-[0.375rem] border bg-surface text-primary">
          <ArrowUpDown />
          排序性:<span>{currentSelect}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sticky="always"
        side="top"
        align="start"
        sideOffset={0}
        className="relative h-[22.625rem] w-64"
      >
        <motion.div
          className="absolute inset-0 border-x border-t border-primary bg-surface"
          variants={menuAnimationVariants}
          initial="closed"
          animate={isSortMenuOpen ? 'open' : 'closed'}
          custom={{ size: 1000, locationX: 128, locationY: 362 }}
        >
          <MenuItemContainer data={sorts} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
export default SortFieldMenu;
