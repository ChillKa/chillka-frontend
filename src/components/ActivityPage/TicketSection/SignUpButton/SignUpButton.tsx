'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import Link from 'next/link';
import { IAcitivityResponse } from 'src/types/activity';

type SignUpButtonProps = {
  className: string;
  data: IAcitivityResponse;
  previewMode?: boolean;
};

const SignUpButton = ({ className, data, previewMode }: SignUpButtonProps) => {
  const { auth } = useAuthContext();
  const canSignUp =
    !data.activity.participated &&
    data.activity.totalParticipantCapacity !== 0 &&
    !previewMode &&
    data.activity.creatorId !== auth?._id;

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
    if (data.activity.creatorId === auth?._id) {
      return '主辦方無法報名';
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
          href={`/payment/${data.activity._id}/select-tickets`}
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
