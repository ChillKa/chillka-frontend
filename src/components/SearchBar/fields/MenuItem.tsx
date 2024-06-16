import { Button } from '@components/ui/button';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// this is setting up animation for each item
const variants = {
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
};

// setting up for changing colors on each item in animation example
// const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];

export type MenuItemProps = {
  item: ReactNode;
  value: string | number;
  startElement?: ReactNode;
  endElement?: ReactNode;
  onSelect?: (value: string | number) => void;
};

const MenuItem = ({
  item,
  value,
  startElement,
  endElement,
  onSelect,
}: MenuItemProps) => {
  return (
    <Button
      asChild
      className="flex h-fit items-center justify-between gap-2.5 bg-surface px-4 py-2.5 transition-colors duration-300 ease-out hover:bg-primary/[0.03]"
      onClick={() => {
        onSelect?.(value);
      }}
    >
      <motion.li
        variants={variants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex w-full items-center justify-between"
      >
        {startElement}
        {item}
        {endElement}
      </motion.li>
    </Button>
  );
};

export default MenuItem;
