'use client';

import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Category } from './CategoryFieldMenu';
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

  const handleSelect = (category: Category['text']) => {
    setValue('sort', category);
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
          <MenuItemContainer data={sorts} onSelect={handleSelect} />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};
export default SortFieldMenu;
