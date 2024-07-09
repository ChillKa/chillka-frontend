'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Lead } from '@components/ui/typography';
import cn from '@lib/utils';
import { isAfter } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';
import { zhTW } from 'date-fns/locale';
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
  startDateTime,
  endDateTime,
  category,
  address = '未知地點',
  participantCount = 0,
}: ManagementCardProps) => {
  // TODO: extract and refact duplicated logic method at following:
  // LINK: src\components\EventCard\EventCard-utils.tsx:176
  const formatDate = (date: string | Date) => {
    return format(toZonedTime(date, 'Asia/Taipei'), 'yyyy.MM.dd （EEEEE）', {
      locale: zhTW,
      timeZone: 'Asia/Taipei',
    });
  };

  const isValidEndTime = (date?: string | Date) => {
    if (!date) return false;
    const endDate = new Date(date);
    const year2100 = new Date('2100-01-01');
    return isAfter(year2100, endDate);
  };

  let timeDisplay = '時間未定';
  if (startDateTime && isValidEndTime(endDateTime)) {
    timeDisplay = `${formatDate(startDateTime)} - ${formatDate(endDateTime!)}`;
  } else if (startDateTime) {
    timeDisplay = `${formatDate(startDateTime)}起`;
  } else if (isValidEndTime(endDateTime)) {
    timeDisplay = `從即日起至${formatDate(endDateTime!)}`;
  }

  return (
    <Card
      className={cn(
        'flex w-full',
        'h-auto flex-col items-stretch rounded-none',
        'xl:h-60 xl:flex-row xl:items-center',
        'bg-transparent text-primary'
      )}
    >
      <div
        className={cn(
          'relative flex-shrink-0 overflow-hidden ',
          'h-48 w-full',
          'xl:h-full xl:w-60'
        )}
      >
        <Image src={thumbnail} alt={name} fill objectFit="cover" />
      </div>
      <div className="flex h-full flex-grow flex-col justify-between p-4">
        <div className="mb-4 w-fit bg-primary px-2 py-1 text-xs/5 font-medium text-white">
          {category}
        </div>
        <div className={cn('grid gap-4 text-xs', 'grid-cols-3  grid-rows-4')}>
          <Link href={`/activity/${id}`} className="order-1">
            <div className="flex w-full flex-row items-center gap-2">
              <Lead>活動名稱</Lead>
              <SquareArrowOutUpRight className="size-4" />
            </div>
          </Link>
          <Lead className="order-3">日期</Lead>
          <Lead className="order-5">位置</Lead>
          <Lead className="order-7">參加人數</Lead>
          <Lead className="order-2 col-span-2 line-clamp-1 font-medium">
            {name}
          </Lead>
          <Lead className="order-4 col-span-2 font-medium">{timeDisplay}</Lead>
          <Lead className="order-6 col-span-2 line-clamp-1 font-medium">
            {address}
          </Lead>
          <Lead className="order-8 col-span-2 font-medium">
            {participantCount}
          </Lead>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 xl:pr-6">
        <Button
          variant="outline"
          className="border-primary px-2 py-1 text-sm"
          asChild
        >
          <Link href={`/member-center/manage-event/${id}/${name}`}>詳情</Link>
        </Button>
        <Button
          variant="outline"
          disabled
          className="border-primary px-2 py-1 text-sm"
        >
          取消活動
        </Button>
      </div>
    </Card>
  );
};

export default ManagementCard;
