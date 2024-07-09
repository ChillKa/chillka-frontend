'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type PaymentFailureSectionProps = {
  activityId: string;
};

const PaymentFailureSection = ({
  activityId: _activityId,
}: PaymentFailureSectionProps) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(countdownInterval);
          setIsRedirecting(true);
          setTimeout(() => {
            router.push('/');
          }, 1000);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <Card className="w-full max-w-md p-8 text-center">
      <h1 className="mb-4 text-3xl font-bold">訂票失敗</h1>
      <p className="mb-6 text-xl">請詢問廠商以尋求問題。</p>
      <Button onClick={() => router.push('/')} className="w-full">
        返回首頁
      </Button>
      <p className="mt-4 text-sm text-gray-500">
        {isRedirecting ? (
          <span className="flex items-center justify-center">
            正在跳轉回首頁
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </span>
        ) : (
          `頁面將在 ${countdown} 秒後自動跳轉回首頁...`
        )}
      </p>
    </Card>
  );
};

export default PaymentFailureSection;
