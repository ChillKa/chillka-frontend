'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';

type SignUpButtonProps = {
  className: string;
  isSignedUp: boolean;
  participantNumber: number;
};

const SignUpButton = ({
  className,
  isSignedUp,
  participantNumber,
}: SignUpButtonProps) => {
  return (
    <Button
      className={cn('h-10 w-full text-base xl:h-14', className)}
      disabled={isSignedUp || participantNumber === 0}
    >
      {participantNumber === 0 && '已額滿'}
      {isSignedUp && '已報名'}
      {!isSignedUp && participantNumber !== 0 && '立即報名'}
    </Button>
  );
};

export default SignUpButton;
