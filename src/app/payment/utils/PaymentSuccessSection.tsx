'use client';

import { RecommendedActivityFetchState } from '@action/activity';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { H2, H4, P, Small } from '@components/ui/typography';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

type PaymentSuccessSectionProps = {
  activityId?: string;
  orderId?: string;
  message?: string;
  activities?: RecommendedActivityFetchState['activities'];
};

const PaymentSuccessSection = ({
  activityId,
  orderId,
  message: _message,
  activities = [],
}: PaymentSuccessSectionProps) => {
  const router = useRouter();
  const { isLoggedin } = useAuthContext();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="w-full space-y-5 bg-transparent p-8 text-center text-primary">
          <H2>訂票成功！</H2>
          <H4 className="font-medium">
            感謝您的訂購，我們期待在活動中見到您。
          </H4>
          <div>
            {orderId && (
              <P>
                訂單編號：
                {isLoggedin ? (
                  <Link href="/member-center/ticket-inquiry">{orderId}</Link>
                ) : (
                  orderId
                )}
              </P>
            )}
            {activityId && <P className="mt-2">活動編號：{activityId}</P>}
          </div>
          <Button
            onClick={() =>
              router.push(activityId ? `/activity/${activityId}` : '/')
            }
            className="mx-auto max-w-md"
          >
            返回活動頁面
          </Button>
        </Card>
      </motion.div>
      <div className="mt-12 flex flex-col items-center">
        <H2 asChild className="mb-6 text-primary">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            為您推薦
          </motion.div>
        </H2>
        <section
          id="recommend-list"
          className="flex w-full flex-col items-center justify-center gap-6 xl:flex-row xl:gap-4"
        >
          {activities.map((activity, index) => {
            return (
              <Link
                key={activity._id}
                href={`/activity/${activity._id}`}
                className="w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + 0.1 * index }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex w-full flex-col gap-1 xl:w-[12.5rem]"
                  >
                    <div className="relative min-w-fit">
                      <div className="relative h-[18.75rem] w-full overflow-hidden xl:h-[12.5rem]">
                        <Image
                          src={activity.thumbnail ?? './default.webp'}
                          alt={
                            activity.summary ?? 'Thumbnail default description'
                          }
                          placeholder="blur"
                          blurDataURL="/loading.webp"
                          layout="fill"
                          objectFit="cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 transition-all duration-300 ease-linear group-hover:h-full">
                          <Small className="line-clamp-1 text-white group-hover:line-clamp-5 group-hover:leading-5">
                            {activity.summary ?? '快來參加吧！'}
                          </Small>
                        </div>
                      </div>
                    </div>
                    <H4 className="mt-2 truncate text-primary">
                      {activity.name}
                    </H4>
                  </motion.div>
                </motion.div>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default PaymentSuccessSection;
