import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import cn from '@lib/utils';
import { useState } from 'react';

type ActivityCreationDropdownMenuProps = {
  contents: string[];
  className: string;
  fieldName: string;
  placeHolder: string;
  onChange: (...event: any[]) => void;
};

const ActivityCreationDropdownMenu = ({
  contents,
  className,
  fieldName,
  placeHolder,
  onChange,
}: ActivityCreationDropdownMenuProps) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string>('');

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="form"
          className={cn(
            'group flex w-full select-none justify-between border border-primary-super-light bg-white pl-0 text-sm font-medium text-primary-light hover:bg-primary-super-light focus:outline-none data-[state=open]:ring-2 data-[state=open]:ring-primary',
            className
          )}
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
        <DropdownMenuRadioGroup value={options} onValueChange={setOptions}>
          {contents.map((item) => (
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

export default ActivityCreationDropdownMenu;
