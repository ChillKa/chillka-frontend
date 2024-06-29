import cn from '@lib/utils';
import { SetStateAction, useState } from 'react';
import ActivityTimePicker from './AcitivityTimePicker';
import ActivityDatePicker from './ActivityDatePicker';

type ActitvityDateWraperProps = {
  className: string;
  name: string;
  value: Date | undefined;
  datePlaceHolder: string;
  timePlaceHolder: string;
  onChange: (...event: any[]) => void;
};

const ActivityDateWrapper = ({
  className,
  name,
  value,
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
    stateValue: SetStateAction<{ day: string; hour: string; minute: string }>
  ) => {
    setDateAndTime(stateValue);
    onChange(new Date(date).toJSON());
  };

  return (
    <div className={cn('', className)}>
      <input name={name} value={value?.toString()} readOnly type="hidden" />
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
