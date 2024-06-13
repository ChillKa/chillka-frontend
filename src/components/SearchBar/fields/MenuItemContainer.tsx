import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import MenuItem from './MenuItem';

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
  icon?: LucideIcon;
  url: string;
  text: string;
};

type MenuItemContainerProps = {
  data: MenuItemDataType[];
  onSelect: (item: MenuItemDataType['text']) => void;
};

const MenuItemContainer = ({ data, onSelect }: MenuItemContainerProps) => {
  return (
    <motion.ul
      variants={variants}
      className="no-scrollbar h-[calc(100%-4.5rem)] space-y-4 overflow-auto px-4 py-6 xl:h-full xl:py-4"
    >
      {data.map((item) => (
        <MenuItem data={item} key={item.text} onSelect={onSelect} />
      ))}
    </motion.ul>
  );
};

export default MenuItemContainer;
