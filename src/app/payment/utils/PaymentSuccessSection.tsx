'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { H2, H4, P, Small } from '@components/ui/typography';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const PaymentSuccessSection = () => {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [countdown, setCountdown] = useState(5);
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
            router.push('/');
          }, 1000); // 給加載圖標一點顯示時間
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

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
        <P>訂單確認郵件已發送至您的信箱。</P>
        <Button onClick={() => router.push('/')} className="w-full">
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
