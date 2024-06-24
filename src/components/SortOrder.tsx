'use client';

import cn from '@lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@radix-ui/react-select';
import { motion } from 'framer-motion';
import { ArrowUpDown, Check } from 'lucide-react';

const sortOptions = [
  { key: '購買日期', value: '1' },
  { key: '活動到期日', value: '2' },
  { key: '金額', value: '3' },
];

type SortOrderProps = {
  state: string;
  changeState: (value: string) => void;
  className?: string;
};

const SortOrder = ({ state, changeState, className }: SortOrderProps) => {
  return (
    <Select value={state} onValueChange={changeState}>
      <SelectTrigger
        className={cn(
          'm-[0.0625rem] box-content flex w-[10.7rem] rounded-[0.5rem] border border-primary px-6 py-3 text-base focus:outline-none data-[state=open]:m-0 data-[state=open]:border-2',
          className
        )}
      >
        <p className="flex items-center">
          <ArrowUpDown size={16} className="mr-[0.625rem]" />
          排序依：
        </p>
        <p className="flex-1">
          {sortOptions.filter((option) => option.value === state)[0].key}
        </p>
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={8}
        className="w-[19.125rem] rounded-[0.5rem] bg-surface p-4 shadow-[0_4px_20px_0px_rgba(0,0,0,0.149)]"
      >
        {sortOptions.map((option, index) => (
          <motion.div
            key={option.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SelectItem
              className={`flex cursor-pointer items-center justify-between px-4 py-2 focus:outline-none ${sortOptions.length === index + 1 ? 'mb-0' : 'mb-4'}`}
              value={option.value}
            >
              {option.key}
              {state === option.value && <Check size={16} />}
            </SelectItem>
          </motion.div>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortOrder;
