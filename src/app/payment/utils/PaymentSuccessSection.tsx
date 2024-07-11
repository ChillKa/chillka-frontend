'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { H2, H4, P, Small } from '@components/ui/typography';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

type PaymentSuccessSectionProps = {
  activityId?: string;
  orderId?: string;
  message?: string;
};

const PaymentSuccessSection = ({
  activityId,
  orderId,
  message: _message,
}: PaymentSuccessSectionProps) => {
  const router = useRouter();
  const { isLoggedin } = useAuthContext();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(countdownInterval);
          setIsRedirecting(true);
          setTimeout(() => {
            router.push(activityId ? `/activity/${activityId}` : '/');
          }, 1000); // 給加載圖標一點顯示時間
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
      clearInterval(countdownInterval);
      clearTimeout(confettiTimer);
    };
  }, [router]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <Card className="w-full max-w-md space-y-5 bg-transparent p-8 text-center text-primary">
        <H2>訂票成功！</H2>
        <H4 className="font-medium">感謝您的訂購，我們期待在活動中見到您。</H4>
        {orderId && (
          <P>
            訂單編號:{' '}
            {isLoggedin ? (
              <Link href="/member-center/ticket-inquiry">{orderId}</Link>
            ) : (
              orderId
            )}
          </P>
        )}
        {activityId && <P>活動編號: {activityId}</P>}

        <Button
          onClick={() =>
            router.push(activityId ? `/activity/${activityId}` : '/')
          }
          className="w-full"
        >
          返回首頁
        </Button>
        <Small className="mt-4">
          {isRedirecting ? (
            <span className="flex items-center justify-center">
              正在跳轉回首頁
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </span>
          ) : (
            `頁面將在 ${countdown} 秒後自動跳轉回首頁...`
          )}
        </Small>
      </Card>
    </>
  );
};

export default PaymentSuccessSection;
