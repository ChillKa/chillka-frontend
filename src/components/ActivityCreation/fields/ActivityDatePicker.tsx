'use client';

import { Button, buttonVariants } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import cn from '@lib/utils';
import { format, toZonedTime } from 'date-fns-tz';
import { zhTW } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

type ActivityDatePickerProps = {
  placeHolder: string;
  onChange: Dispatch<
    SetStateAction<{ day: string; hour: string; minute: string }>
  >;
};

const ActivityDatePicker = ({
  placeHolder,
  onChange,
}: ActivityDatePickerProps) => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'group flex w-full justify-between rounded-[0.375rem] border-primary-super-light bg-white text-left font-normal text-primary-light transition-all duration-300 hover:bg-primary-super-light data-[state=open]:ring-2 data-[state=open]:ring-primary',
            !date && 'text-primary-super-light'
          )}
        >
          {date ? (
            format(toZonedTime(date, 'Asia/Taipei'), 'PPP', {
              locale: zhTW,
              timeZone: 'Asia/Taipei',
            })
          ) : (
            <span className="text-primary-light transition-colors group-hover:text-primary">
              {placeHolder}
            </span>
          )}
          <CalendarIcon className="h-4 w-4 stroke-primary-light transition-colors group-hover:stroke-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-auto rounded-[0.375rem] border-primary-super-light p-0 shadow"
      >
        <Calendar
          weekStartsOn={0}
          fromDate={new Date()}
          mode="single"
          selected={date}
          onSelect={(e) => {
            setDate(e);
            onChange((prevState) => {
              return {
                ...prevState,
                day: e ? e.toDateString() : '',
              };
            });
          }}
          showOutsideDays={false}
          initialFocus
          className="p-4"
          classNames={{
            caption:
              'relative flex items-center justify-center pt-1 font-medium text-primary',
            nav_button: cn(
              buttonVariants({ variant: 'ghost' }),
              'h-auto w-auto p-3 text-primary hover:bg-primary-super-light hover:opacity-100'
            ),
            head_cell:
              'h-11 w-[3.325rem] rounded-[0.375rem] px-4 py-2.5 font-medium text-primary-light',
            cell: 'relative h-11 w-[3.325rem] p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
            day: cn(
              buttonVariants({ variant: 'ghost' }),
              'h-11 w-[3.125rem] rounded-[0.375rem] px-4 py-2.5 font-medium text-primary-light shadow-[0px_1px_1px_0px_rgba(0,14,51,0.05)] hover:bg-primary-super-light hover:opacity-100 aria-selected:opacity-100'
            ),
            day_today: 'bg-primary-super-light text-primary',
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ActivityDatePicker;
