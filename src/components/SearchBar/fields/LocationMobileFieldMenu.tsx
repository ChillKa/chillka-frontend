import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import MenuItemContainer from './MenuItemContainer';
import { menuMobileAnimationVariants } from './utils';

export type LocationMobileFieldMenuProps = {
  locations: {
    url: string;
    text: string;
  }[];
  height: number;
  menuOpen?: boolean;
  onSelected?: (isOpen: boolean) => void;
  width: number;
};

const LocationMobileFieldMenu = ({
  locations,
  height,
  menuOpen = false,
  onSelected,
  width,
}: LocationMobileFieldMenuProps) => {
  const { setValue } = useFormContext();

  const handleSelect = (selected: ReactNode) => {
    setValue('location', selected);
    onSelected?.(false);
  };

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 top-20 border-t border-primary bg-surface"
      variants={menuMobileAnimationVariants}
      initial="closed"
      animate={menuOpen ? 'open' : 'closed'}
      custom={{
        size: height * 2,
        locationX: width / 4,
        locationY: height,
      }}
    >
      <MenuItemContainer items={locations} onSelect={handleSelect} />
    </motion.div>
  );
};

export default LocationMobileFieldMenu;
