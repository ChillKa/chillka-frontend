'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { H2, P, Small } from '@components/ui/typography';
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
    <Card className="w-full max-w-md space-y-5 bg-transparent p-8 text-center text-primary">
      <H2>訂票失敗！</H2>
      <P className="mb-6">請聯絡廠商以尋求解決問題的方法。</P>
      <Button onClick={handleClick} className="w-full">
        {activityId ? '返回選購訂票頁' : '返回首頁'}
      </Button>
      <Small className="mt-4">{message && `錯誤訊息：${message}`}</Small>
    </Card>
  );
};

export default PaymentFailureSection;
