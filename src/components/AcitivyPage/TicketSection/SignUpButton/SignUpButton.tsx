'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';

type SignUpButtonProps = {
  className: string;
};

const SignUpButton = ({ className }: SignUpButtonProps) => {
  const { data } = useActivityContext();

  if (!data) {
    return null;
  }

  return (
    <Button
      className={cn('h-10 w-full text-base xl:h-14', className)}
      disabled={
        data.activity.participated ||
        data.activity.totalParticipantCapacity === 0
      }
    >
      {data.activity.totalParticipantCapacity === 0 &&
        !data.activity.participated &&
        '已額滿'}
      {data.activity.participated && '已報名'}
      {!data.activity.participated &&
        data.activity.totalParticipantCapacity !== 0 &&
        '立即報名'}
    </Button>
  );
};

export default SignUpButton;
