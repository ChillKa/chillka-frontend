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

export type Category = {
  endElement: ReactNode;
  text: string;
};

export type AdvancedCategoryMobileFieldProps = {
  categories: Category[];
  onSelect?: (value: string | number) => void;
};

const AdvancedCategoryMobileField = ({
  categories,
  onSelect,
}: AdvancedCategoryMobileFieldProps) => {
  const { setValue } = useFormContext();

  const handleSelect: MenuItemContainerProps['onSelect'] = (selected) => {
    setValue('category', selected);
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
          類型
        </AccordionTrigger>
        <AccordionContent className="">
          <MenuItemContainer items={categories} onSelect={handleSelect} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvancedCategoryMobileField;
