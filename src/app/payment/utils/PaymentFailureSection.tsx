'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { P } from '@components/ui/typography';
import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';

type PaymentFailureSectionProps = {
  activityId?: string;
  message?: string;
};

const PaymentFailureSection = ({
  activityId,
  message,
}: PaymentFailureSectionProps) => {
  const router = useRouter();

  const handleClick: HTMLAttributes<HTMLButtonElement>['onClick'] = () => {
    if (activityId) {
      router.push(`/payment/${activityId}`);
    } else {
      router.push('/');
    }
  };

  return (
    <Card className="w-full max-w-md p-8 text-center">
      <h1 className="mb-4 text-3xl font-bold">訂票失敗</h1>
      <p className="mb-6 text-xl">請詢問廠商以尋求問題。</p>
      <Button onClick={handleClick} className="w-full">
        {activityId ? '返回選購訂票頁' : '返回首頁'}
      </Button>
      <P>{message && `錯誤訊息: ${message}`}</P>
    </Card>
  );
};

export default PaymentFailureSection;
