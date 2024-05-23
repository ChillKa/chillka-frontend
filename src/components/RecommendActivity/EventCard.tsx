'use client';

import cn from '@lib/utils';
import { cva } from 'class-variance-authority';
import {
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  MapPin,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { FormatDate } from './RecommendActivity-types';

interface EventCardProps {
  title: string;
  cover: string;
  description: string;
  startTime: FormatDate<'YY.MM.DD'>;
  endTime: string;
  attendeeCount: number;
  isCollected: boolean;
  location: string;
  organizer: string;
  pricing: number;
  discount: number | undefined;
}

const EventCard = ({
  title,
  cover,
  description,
  startTime,
  endTime,
  attendeeCount,
  isCollected = false,
  location,
  organizer,
  pricing,
  discount,
}: EventCardProps) => {
  const [collected, setCollected] = useState(isCollected);

  const collectedVariants = cva(
    'absolute bottom-0 right-0 flex h-20 w-20 flex-col items-center justify-center gap-2 text-xs transition ease-out duration-300',
    {
      variants: {
        collected: {
          true: 'bg-primary text-white',
          false: 'bg-surface text-black',
        },
      },
    }
  );

  const handleToggle = () => {
    setCollected((prev) => !prev);
  };

  return (
    <div
      id="event-card"
      className={cn(
        'bg-red flex h-[35.25rem] w-full flex-col gap-8',
        'xl:w-[26rem]'
      )}
    >
      <div className="relative h-[13rem] w-full overflow-hidden">
        <Image
          src={cover}
          alt="Descriptive Alt Text"
          layout="fill"
          objectFit="cover"
          className={cn(
            'absolute left-0 top-0 h-full w-full',
            'transition-transform duration-300 hover:scale-110'
          )}
        />
        <button
          type="button"
          onClick={handleToggle}
          className={collectedVariants({ collected })}
        >
          {collected ? <Check /> : <Bookmark />}
          {collected ? '已收藏' : '收藏'}
        </button>
      </div>

      <div className="w- flex h-[5.5rem] flex-col gap-4">
        <h1 className="truncate text-2xl font-semibold">{title}</h1>
        <p className="line-clamp-2 overflow-hidden text-ellipsis text-sm text-gray-600">
          {description}
        </p>
      </div>

      <div className="flex h-[9rem] flex-col justify-between gap-4">
        <div className="flex justify-start gap-4">
          <CalendarDays />
          <p className="h-6 w-16 text-base font-normal">活動時間</p>
          <p className="font-medium">
            {startTime}-{endTime}
          </p>
        </div>
        <div className="flex justify-start gap-4">
          <Users size={24} />
          <p className="h-6 w-16 text-base font-normal">參加人數</p>
          <p className="truncate text-base font-medium">{attendeeCount}</p>
        </div>
        <div className="flex justify-start gap-4">
          <MapPin size={24} />
          <p className="h-6 w-16 text-base font-normal">舉辦位置</p>
          <p className="truncate text-base font-medium">{location}</p>
        </div>
        <div className="flex justify-start gap-4">
          <Building2 size={24} />
          <p className="h-6 w-16 text-base font-normal">主辦單位</p>
          <p className="truncate text-base font-medium">{organizer}</p>
        </div>
      </div>

      <div className="flex h-7 items-center justify-start gap-2">
        <span className="text-lg font-bold">NT${pricing}</span>
        {discount && (
          <span className="bg-primary px-2 py-1 text-white">
            {discount}% OFF
          </span>
        )}
      </div>
    </div>
  );
};

export default EventCard;
