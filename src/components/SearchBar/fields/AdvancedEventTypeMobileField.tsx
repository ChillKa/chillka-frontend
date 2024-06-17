import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import cn from '@lib/utils';
import { ReactNode } from 'react';
import MenuItemContainer, { MenuItemContainerProps } from './MenuItemContainer';

export type EventType = {
  endElement: ReactNode;
  text: string;
};

export type AdvancedEventTypeMobileFieldProps = {
  events: EventType[];
  onSelect?: (value: string | number) => void;
};

const AdvancedEventTypeMobileField = ({
  events,
  onSelect,
}: AdvancedEventTypeMobileFieldProps) => {
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
          形式
        </AccordionTrigger>
        <AccordionContent className="">
          <MenuItemContainer items={events} onSelect={handleSelect} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvancedEventTypeMobileField;
