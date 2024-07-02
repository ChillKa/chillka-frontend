'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type ManagementCardProps = {
  _id?: string;
  name?: string;
  thumbnail?: string;
  startDateTime?: string;
  endDateTime?: string;
  category?: string;
  address?: string;
};

const ManagementCard = ({
  _id,
  name = '未知活動',
  thumbnail = '/default.webp',
  startDateTime = '2008/02/10',
  endDateTime = '2008/02/11',
  category,
  address = '未知地點',
}: ManagementCardProps) => {
  return (
    <Card className="flex h-32 w-full flex-row items-center gap-4 rounded-r-2xl pr-2">
      <div className="h-full w-32">
        <Image
          src={thumbnail}
          alt={name}
          width={500}
          height={500}
          objectFit="cover"
        />
      </div>
      <div className="flex h-full flex-grow flex-col justify-between py-4">
        <div className="w-fit bg-primary text-sm text-white">{category}</div>
        <div className=" grid grid-cols-4 gap-4 text-xs">
          <Link href={`/activity/${_id}`}>
            <div className="flex flex-row items-center gap-2">
              <div className="font-semibold">活動名稱</div>
              <SquareArrowOutUpRight className="size-3" />
            </div>
          </Link>
          <div className="font-semibold">日期</div>
          <div className="font-semibold">位置</div>
          <div className="font-semibold">參加人數</div>
          <div>{name}</div>
          <div>
            {startDateTime} - {endDateTime}
          </div>
          <div>{address}</div>
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
