'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import cn from '@lib/utils';
import { format } from 'date-fns';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type ManagementCardProps = {
  id?: string;
  name?: string;
  thumbnail?: string;
  startDateTime?: string;
  endDateTime?: string;
  category?: string;
  address?: string;
  participantCount?: number;
};

const ManagementCard = ({
  id,
  name = '未知活動',
  thumbnail = '/default.webp',
  startDateTime = '2008/02/10',
  endDateTime = '2008/02/11',
  category,
  address = '未知地點',
  participantCount = 0,
}: ManagementCardProps) => {
  return (
    <Card
      className={cn(
        'flex w-full gap-4',
        'h-auto flex-col items-stretch rounded-none p-2',
        'xl:h-32 xl:flex-row xl:items-center xl:rounded-r-2xl xl:py-0 xl:pl-0 xl:pr-2'
      )}
    >
      <div
        className={cn(
          'relative flex-shrink-0 overflow-hidden ',
          'h-48 w-full',
          'xl:h-full xl:w-32'
        )}
      >
        <Image src={thumbnail} alt={name} fill objectFit="cover" />
      </div>
      <div className="flex h-full flex-grow flex-col justify-between py-4">
        <div className="w-fit bg-primary text-sm text-white">{category}</div>
        <div
          className={cn(
            'grid gap-4 text-xs',
            'grid-cols-2  grid-rows-4',
            'xl:grid-cols-4 xl:grid-rows-2'
          )}
        >
          <Link href={`/activity/${id}`} className="order-1">
            <div className="flex flex-row items-center gap-2">
              <div className="font-semibold">活動名稱</div>
              <SquareArrowOutUpRight className="size-3" />
            </div>
          </Link>
          <div className="order-3 font-semibold xl:order-2">日期</div>
          <div className="order-5 font-semibold xl:order-3">位置</div>
          <div className="order-7 font-semibold xl:order-4">參加人數</div>
          <div className="order-2 xl:order-5">{name}</div>
          <div className="order-4 xl:order-6">
            {format(startDateTime, 'yyyy-MM-dd')} -{' '}
            {format(endDateTime, 'yyyy-MM-dd')}
          </div>
          <div className="order-6 xl:order-7">{address}</div>
          <div className="order-8 xl:order-8">{participantCount}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="outline" className="px-2 py-1 text-sm">
          <Link href={`/member-center/manage-event/${id}/${name}`}>詳情</Link>
        </Button>
        <Button variant="outline" disabled className="px-2 py-1 text-sm">
          取消活動
        </Button>
      </div>
    </Card>
  );
};

export default ManagementCard;
