import cn from '@lib/utils';
import { useState } from 'react';
import ActivityTimePicker from './AcitivityTimePicker';
import ActivityDatePicker from './ActivityDatePicker';

type ActitvityDateWraperProps = {
  className: string;
  name: string;
  datePlaceHolder: string;
  timePlaceHolder: string;
  onChange: (...event: any[]) => void;
};

const ActivityDateWrapper = ({
  className,
  name,
  datePlaceHolder = '設定日期',
  timePlaceHolder = '設定時間',
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

  const { day, hour, minute } = dateAndTime;
  const date = day === '' ? '' : `${day} ${hour}:${minute}:00`;

  return (
    <div className={cn('', className)}>
      <input
        name={name}
        readOnly
        type="hidden"
        value={date || ''}
        onChange={() => onChange(date || '')}
      />
      <ActivityDatePicker
        placeHolder={datePlaceHolder}
        onChange={setDateAndTime}
      />
      <ActivityTimePicker
        placeHolder={timePlaceHolder}
        onChange={setDateAndTime}
      />
    </div>
  );
};

export default ActivityDateWrapper;
