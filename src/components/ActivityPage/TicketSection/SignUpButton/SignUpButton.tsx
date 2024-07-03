'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import Link from 'next/link';
import { IAcitivityResponse } from 'src/types/activity';

type SignUpButtonProps = {
  className: string;
  data: IAcitivityResponse;
  previewMode?: boolean;
};

const SignUpButton = ({ className, data, previewMode }: SignUpButtonProps) => {
  const canSignUp =
    !data.activity.participated &&
    data.activity.totalParticipantCapacity !== 0 &&
    !previewMode;

  const buttonContent = () => {
    if (
      data.activity.totalParticipantCapacity === 0 &&
      !data.activity.participated
    ) {
      return '已額滿';
    }
    if (data.activity.participated) {
      return '已報名';
    }
    return '立即報名';
  };

  return (
    <Button
      className={cn('h-10 w-full text-base xl:h-14', className)}
      disabled={!canSignUp}
    >
      {canSignUp ? (
        <Link
          href="/payment/select-tickets"
          className="flex h-full w-full items-center justify-center"
        >
          {buttonContent()}
        </Link>
      ) : (
        buttonContent()
      )}
    </Button>
  );
};

export default SignUpButton;
