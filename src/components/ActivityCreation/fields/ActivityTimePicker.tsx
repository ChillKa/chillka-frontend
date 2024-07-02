'use client';

import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import { TimerIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

type ActivityTimePickerProps = {
  placeHolder: string;
  onChange: Dispatch<
    SetStateAction<{ day: string; hour: string; minute: string }>
  >;
};

const ActivityTimePicker = ({
  placeHolder,
  onChange,
}: ActivityTimePickerProps) => {
  const [selectedTime, setSelectedTime] = useState<{
    hour: string;
    minute: string;
  }>({ hour: '', minute: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  const handleHourSelect = (hour: string) => {
    setSelectedTime((prevState) => ({ ...prevState, hour }));
    onChange((prevState) => {
      return {
        ...prevState,
        hour,
      };
    });
  };

  const handleMinuteSelect = (minute: string) => {
    setSelectedTime((prevState) => ({ ...prevState, minute }));
    onChange((prevState) => {
      return {
        ...prevState,
        minute,
      };
    });
  };

  const { hour: selectedHour, minute: selectedMinute } = selectedTime;
  const time =
    selectedHour === '' && selectedMinute === ''
      ? ''
      : `${selectedHour}:${selectedMinute}`;

  return (
    <DropdownMenu open={isMenuOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="form"
          className="group flex w-full select-none justify-between border border-primary-super-light bg-white text-sm font-medium text-primary-light hover:bg-primary-super-light focus:outline-none data-[state=open]:ring-2 data-[state=open]:ring-primary"
          onClick={() =>
            setIsMenuOpen((isCurrentMenuOpen) => !isCurrentMenuOpen)
          }
        >
          <Input
            variant="form"
            className="pointer-events-none cursor-pointer select-none border-0 pl-0 font-normal text-primary-light transition focus-visible:ring-0 focus-visible:ring-offset-0 group-hover:bg-primary-super-light"
            value={time}
            placeholder={placeHolder}
            readOnly
          />
          <TimerIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        onInteractOutside={() => {
          setIsMenuOpen(() => false);
        }}
        className="grid grid-cols-2 gap-1.5 rounded-[0.375rem] border border-primary-super-light bg-white p-1.5 text-primary shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div className="col-span-1 w-16">
          <div className="py-1.5 pl-8 text-sm font-medium text-primary-light">
            時
          </div>
          <div className="no-scrollbar h-[19rem] overflow-y-auto">
            {hours.map((hour) => (
              <DropdownMenuCheckboxItem
                checked={selectedTime.hour === hour}
                key={hour}
                onSelect={() => handleHourSelect(hour)}
                textValue={hour}
                className="stroke-2 font-medium focus:bg-primary-super-light data-[state=checked]:bg-primary-super-light"
              >
                {hour}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </div>
        <div className="col-span-1 w-16">
          <div className="py-1.5 pl-8 text-sm font-medium text-primary-light">
            分
          </div>
          <div className="no-scrollbar h-[19rem] overflow-y-auto">
            {minutes.map((minute) => (
              <DropdownMenuCheckboxItem
                checked={selectedTime.minute === minute}
                key={minute}
                onSelect={() => handleMinuteSelect(minute)}
                textValue={minute}
                className="font-medium focus:bg-primary-super-light data-[state=checked]:bg-primary-super-light"
              >
                {minute}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </div>
        <div className="col-span-2 flex justify-center gap-1.5 border-t border-primary-super-light pt-1.5">
          <Button
            variant="ghost"
            className="rounded-[0.375rem] hover:bg-primary-super-light"
            onClick={() => {
              handleHourSelect('00');
              handleMinuteSelect('00');
            }}
          >
            清空
          </Button>
          <Button
            variant="form"
            className="bg-primary-light"
            onClick={() => {
              setIsMenuOpen(() => false);
            }}
          >
            確定
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActivityTimePicker;
