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
};

const MenuItemContainer = ({ data }: MenuItemContainerProps) => (
  <motion.ul variants={variants} className="space-y-4">
    {data.map((item) => (
      <MenuItem data={item} key={item.text} />
    ))}
  </motion.ul>
);

export default MenuItemContainer;
