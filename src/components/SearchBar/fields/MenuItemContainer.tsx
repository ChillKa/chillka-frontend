import { Lead } from '@components/ui/typography';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import MenuItem, { MenuItemProps } from './MenuItem';

// this is setting up animation for items on client stage.
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.6 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

type MenuItemDataType = {
  startElement?: ReactNode;
  endElement?: ReactNode;
  url?: string;
  text: string;
};

export type MenuItemContainerProps = {
  items: MenuItemDataType[];
  onSelect: MenuItemProps['onSelect'];
};

const MenuItemContainer = ({ items, onSelect }: MenuItemContainerProps) => {
  return (
    <motion.ul
      variants={variants}
      className="no-scrollbar h-[calc(100%-4.5rem)] space-y-4 overflow-auto px-4 py-6 xl:h-full xl:py-4"
    >
      {items.map((item) => {
        return (
          <MenuItem
            key={item.text}
            value={item.text}
            startElement={item.startElement}
            item={<Lead className="text-primary">{item.text}</Lead>}
            endElement={item.endElement}
            onSelect={onSelect}
          />
        );
      })}
    </motion.ul>
  );
};

export default MenuItemContainer;
