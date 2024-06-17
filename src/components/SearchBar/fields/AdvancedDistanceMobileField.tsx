import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import cn from '@lib/utils';
import { ReactNode } from 'react';
import MenuItemContainer, { MenuItemContainerProps } from './MenuItemContainer';

export type Distance = {
  endElement: ReactNode;
  text: string;
};

export type AdvancedDistanceMobileFieldProps = {
  distances: Distance[];
  onSelect?: (value: string | number) => void;
};

const AdvancedDistanceMobileField = ({
  distances,
  onSelect,
}: AdvancedDistanceMobileFieldProps) => {
  const handleSelect: MenuItemContainerProps['onSelect'] = (value) => {
    onSelect?.(value);
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
          距離
        </AccordionTrigger>
        <AccordionContent className="">
          <MenuItemContainer items={distances} onSelect={handleSelect} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvancedDistanceMobileField;
