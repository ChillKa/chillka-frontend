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
import { useState } from 'react';

interface EventCardProps {
  title: string;
  cover: string;
  description: string;
  startTime: string;
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
    'absolute bottom-0 right-0 flex h-[80px] w-[80px] flex-col items-center justify-center gap-2 text-xs transition duration-300',
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
        'bg-red flex h-[564px] w-full flex-col gap-8',
        'xl:w-[416px]'
      )}
    >
      <div className="relative h-[208px] w-full overflow-hidden">
        <img
          src={cover}
          alt="Descriptive Alt Text"
          className={cn(
            'absolute left-0 top-0 h-full w-full object-cover',
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

      <div className="flex h-[88px] flex-col gap-4">
        <h1 className="truncate text-2xl font-semibold">{title}</h1>
        <p className="line-clamp-2 overflow-hidden text-ellipsis text-sm text-gray-600">
          {description}
        </p>
      </div>

      <div className="flex h-[144px] flex-col justify-between gap-4">
        <div className="flex justify-start gap-4">
          <CalendarDays />
          <p className="font-[400]">活動時間</p>
          <p className="font-[500]">
            {startTime}-{endTime}
          </p>
        </div>
        <div className="flex justify-start gap-4">
          <Users />
          <p>參加人數</p>
          <p>{attendeeCount}</p>
        </div>
        <div className="flex justify-start gap-4">
          <MapPin />
          <p>舉辦位置</p>
          <p>{location}</p>
        </div>
        <div className="flex justify-start gap-4">
          <Building2 />
          <p>主辦單位</p>
          <p className="truncate">{organizer}</p>
        </div>
      </div>

      <div className="flex h-[28px] items-center justify-start gap-2">
        <span className="text-lg font-bold">NT${pricing}</span>
        {discount && (
          <span className="bg-slate-600 px-2 py-1 text-white">
            {discount}% OFF
          </span>
        )}
      </div>
    </div>
  );
};

export default EventCard;
