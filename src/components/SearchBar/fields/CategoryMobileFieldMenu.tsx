import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { Category } from './CategoryFieldMenu';
import MenuItemContainer from './MenuItemContainer';
import { menuMobileAnimationVariants } from './utils';

export type CategoryMobileFieldMenuProps = {
  categories: Category[];
  height: number;
  menuOpen?: boolean;
  onSelected?: (isOpen: boolean) => void;
  width: number;
};

const CategoryMobileFieldMenu = ({
  categories,
  height,
  menuOpen = false,
  onSelected,
  width,
}: CategoryMobileFieldMenuProps) => {
  const { setValue } = useFormContext();

  const handleSelect = (selected: ReactNode) => {
    setValue('category', selected);
    onSelected?.(false);
  };

  return (
    <motion.div
      initial="closed"
      animate={menuOpen ? 'open' : 'closed'}
      className="absolute bottom-0 left-0 right-0 top-20 border-t border-primary bg-surface"
      variants={menuMobileAnimationVariants}
      custom={{
        size: height * 2,
        locationX: (width * 3) / 4,
        locationY: height,
      }}
    >
      <MenuItemContainer items={categories} onSelect={handleSelect} />
    </motion.div>
  );
};

export default CategoryMobileFieldMenu;
