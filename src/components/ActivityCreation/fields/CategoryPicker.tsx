import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import { useState } from 'react';

const DUMMY_CATEGORIES = [
  '戶外踏青',
  '社交活動',
  '興趣嗜好',
  '運動健身',
  '健康生活',
  '科技玩物',
  '藝術文化',
  '遊戲',
];

type CategoryPickerProps = {
  fieldName: string;
  placeHolder: string;
  onChange: (...event: any[]) => void;
};

const CategoryPicker = ({
  fieldName,
  placeHolder,
  onChange,
}: CategoryPickerProps) => {
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState<string>('');

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="form"
          className="group flex w-full select-none justify-between border border-primary-super-light bg-white pl-0 text-sm font-medium text-primary-light hover:bg-primary-super-light focus:outline-none data-[state=open]:ring-2 data-[state=open]:ring-primary"
        >
          <Input
            name={fieldName}
            variant="form"
            className="pointer-events-none cursor-pointer select-none border-0 text-primary-light transition focus-visible:ring-0 focus-visible:ring-offset-0 group-hover:bg-primary-super-light"
            value={inputValue}
            placeholder={placeHolder}
            readOnly
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="rounded-[0.375rem] border border-primary-super-light bg-white p-1.5 text-primary shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <DropdownMenuRadioGroup
          value={categories}
          onValueChange={setCategories}
        >
          {DUMMY_CATEGORIES.map((item) => (
            <DropdownMenuRadioItem
              key={item}
              value={item}
              onSelect={() => {
                setInputValue(item);
                onChange(item);
              }}
              className="font-medium focus:bg-primary-super-light data-[state=checked]:bg-primary-super-light"
            >
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryPicker;
