'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';

type SignUpButtonProps = {
  className: string;
  isSignedUp: boolean;
  participantCapacity: number;
};

const SignUpButton = ({
  className,
  isSignedUp,
  participantCapacity,
}: SignUpButtonProps) => {
  return (
    <Button
      className={cn('h-10 w-full text-base xl:h-14', className)}
      disabled={isSignedUp || participantCapacity === 0}
    >
      {participantCapacity === 0 && '已額滿'}
      {isSignedUp && '已報名'}
      {!isSignedUp && participantCapacity !== 0 && '立即報名'}
    </Button>
  );
};

export default SignUpButton;
