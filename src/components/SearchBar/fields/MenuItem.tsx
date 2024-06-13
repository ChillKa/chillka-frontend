import { Button } from '@components/ui/button';
import { Lead } from '@components/ui/typography';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

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

type MenuItemDataType = {
  icon?: LucideIcon;
  url: string;
  text: string;
};

type MenuItemProps = {
  data: MenuItemDataType;
  onSelect: (item: MenuItemDataType['text']) => void;
};

const MenuItem = ({ data, onSelect }: MenuItemProps) => {
  //   const style = { border: `2px solid ${colors[index]}` };
  const Icon = data.icon;
  return (
    <Button
      asChild
      className="flex h-fit items-center justify-between gap-2.5 bg-surface px-4 py-2.5 transition-colors duration-300 ease-out hover:bg-primary/[0.03]"
      onClick={() => {
        onSelect(data.text);
      }}
    >
      <motion.li
        variants={variants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Lead className="text-primary">{data.text}</Lead>
        {Icon && <Icon className="size-6 stroke-primary" />}
      </motion.li>
    </Button>
  );
};

export default MenuItem;
