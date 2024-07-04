'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const CompletePage = () => {
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
    <div className="flex min-h-screen items-center justify-center">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <Card className="w-full max-w-md p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">訂票成功！</h1>
        <p className="mb-6 text-xl">感謝您的訂購，我們期待在活動中見到您。</p>
        <p className="mb-8 text-gray-600">訂單確認郵件已發送至您的信箱。</p>
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
    </div>
  );
};

export default CompletePage;
