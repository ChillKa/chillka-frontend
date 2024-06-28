import cn from '@lib/utils';
import { useState } from 'react';
import ActivityTimePicker from './AcitivityTimePicker';
import ActivityDatePicker from './ActivityDatePicker';

type ActitvityDateWraperProps = {
  className: string;
  name: string;
  onChange: (...event: any[]) => void;
};

const ActivityDateWrapper = ({
  className,
  name,
  onChange,
}: ActitvityDateWraperProps) => {
  const [dateAndTime, setDateAndTime] = useState<{
    day: string;
    hour: string;
    minute: string;
  }>({
    day: '',
    hour: '',
    minute: '',
  });

  const date = new Date(
    `${dateAndTime.day} ${dateAndTime.hour}:${dateAndTime.minute}:00`
  ).toJSON();

  return (
    <div className={cn('', className)}>
      <input
        name={name}
        readOnly
        type="hidden"
        value={date || ''}
        onChange={() => onChange(date || '')}
      />
      <ActivityDatePicker onChange={setDateAndTime} />
      <ActivityTimePicker onChange={setDateAndTime} />
    </div>
  );
};

export default ActivityDateWrapper;
