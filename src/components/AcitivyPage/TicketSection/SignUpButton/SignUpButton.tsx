'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';

type SignUpButtonProps = {
  className: string;
  participantCapacity: number;
  participated: boolean;
};

const SignUpButton = ({
  className,
  participated,
  participantCapacity,
}: SignUpButtonProps) => {
  return (
    <Button
      className={cn('h-10 w-full text-base xl:h-14', className)}
      disabled={participated || participantCapacity === 0}
    >
      {participantCapacity === 0 && '已額滿'}
      {participated && '已報名'}
      {!participated && participantCapacity !== 0 && '立即報名'}
    </Button>
  );
};

export default SignUpButton;
