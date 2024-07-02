'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import Image from 'next/image';

const ManagementCard = () => {
  return (
    <Card className="flex h-32 w-full flex-row items-center gap-4 rounded-r-2xl pr-2">
      <div className="h-full w-32">
        <Image
          src="/default.webp"
          alt="activity image"
          width={500}
          height={500}
          objectFit="cover"
        />
      </div>
      <div className="flex h-full flex-grow flex-col justify-between py-4">
        <div className="w-fit bg-primary text-sm text-white">興趣嗜好</div>
        <div className=" grid grid-cols-4 gap-4 text-sm">
          <div className="font-semibold">活動名稱</div>
          <div className="font-semibold">日期</div>
          <div className="font-semibold">位置</div>
          <div className="font-semibold">參加人數</div>
          <div>韓國手做地毯</div>
          <div>2024/07/06</div>
          <div>台北市 中正區</div>
          <div>60</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="outline" className="px-2 py-1 text-sm">
          詳情
        </Button>
        <Button variant="outline" className="px-2 py-1 text-sm">
          取消活動
        </Button>
      </div>
    </Card>
  );
};

export default ManagementCard;
