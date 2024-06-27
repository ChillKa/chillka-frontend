'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import { IAcitivityResponse } from 'src/types/activity';

type SignUpButtonProps = {
  className: string;
  data: IAcitivityResponse;
  priviewMode?: boolean;
};

const SignUpButton = ({ className, data, priviewMode }: SignUpButtonProps) => {
  return (
    <Button
      className={cn('h-10 w-full text-base xl:h-14', className)}
      disabled={
        data.activity.participated ||
        data.activity.totalParticipantCapacity === 0 ||
        priviewMode
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
