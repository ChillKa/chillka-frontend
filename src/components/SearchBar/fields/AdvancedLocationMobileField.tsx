import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import cn from '@lib/utils';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import MenuItemContainer, { MenuItemContainerProps } from './MenuItemContainer';

export type Location = {
  endElement: ReactNode;
  text: string;
};

export type AdvancedLocationMobileFieldProps = {
  locations: Location[];
  onSelect?: (value: string | number) => void;
};

const AdvancedLocationMobileField = ({
  locations,
  onSelect,
}: AdvancedLocationMobileFieldProps) => {
  const { setValue } = useFormContext();

  const handleSelect: MenuItemContainerProps['onSelect'] = (selected) => {
    setValue('location', selected);
    onSelect?.(selected);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={cn(
            ' bg-surface px-3 py-6',
            'min-w-[21.9375rem] border-0 text-xl font-bold '
          )}
        >
          地區
        </AccordionTrigger>
        <AccordionContent className="">
          <MenuItemContainer items={locations} onSelect={handleSelect} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvancedLocationMobileField;
