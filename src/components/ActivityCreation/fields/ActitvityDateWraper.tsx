import cn from '@lib/utils';
import { SetStateAction, useState } from 'react';
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

  const onChangeAndCheck = (
    value: SetStateAction<{ day: string; hour: string; minute: string }>
  ) => {
    setDateAndTime(value);
    onChange(new Date(date).toJSON());
  };

  return (
    <div className={cn('', className)}>
      <input name={name} value={date || ''} readOnly type="hidden" />
      <ActivityDatePicker
        placeHolder={datePlaceHolder}
        onChange={onChangeAndCheck}
      />
      <ActivityTimePicker
        placeHolder={timePlaceHolder}
        onChange={onChangeAndCheck}
      />
    </div>
  );
};

export default ActivityDateWrapper;
