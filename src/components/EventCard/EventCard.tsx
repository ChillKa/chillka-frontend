'use client';

import { H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { Building2, CalendarDays, MapPin, Users } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { FormatDate } from './EventCard-types';
import {
  ContinuousCardField,
  EventCardCoverSection,
  discountLabel,
} from './EventCard-utils';

type EventCardProps = {
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
  isContinuous?: boolean;
  discount: number | undefined; // -1 is free, 0 is none discount, positive is off discount
  className?: string;
};

const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  (
    {
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
      isContinuous = false,
      discount = 0,
      className,
    },
    ref
  ) => {
    const [collected, setCollected] = useState(isCollected);

    const handleToggle = () => {
      setCollected((prev) => !prev);
    };

    return (
      <div
        ref={ref}
        id="event-card"
        className={cn(
          'flex h-[35.25rem] w-full flex-col gap-8 text-primary',
          'xl:w-[26rem]',
          className
        )}
      >
        <EventCardCoverSection
          src={cover}
          collected={collected}
          onToggle={handleToggle}
        />

        <div className="w- flex h-[5.5rem] flex-col gap-4">
          <H3 className="truncate">{title}</H3>
          <p className="line-clamp-2 overflow-hidden text-ellipsis text-sm">
            {description}
          </p>
        </div>

        <div className="flex h-[9rem] flex-col justify-between gap-4">
          <div className="flex justify-start gap-4">
            <CalendarDays className="flex-shrink-0" size={24} />
            <p className="h-6 w-16 flex-shrink-0 text-base font-normal">
              活動時間
            </p>
            <p className="flex-grow truncate text-base font-medium">
              {startTime}-{endTime}
            </p>
          </div>
          <div className="flex justify-start gap-4">
            <Users className="flex-shrink-0" size={24} />
            <p className="h-6 w-16 flex-shrink-0 text-base font-normal">
              參加人數
            </p>
            <p className="flex-grow truncate text-base font-medium">
              {attendeeCount}
            </p>
          </div>
          <div className="flex justify-start gap-4">
            <MapPin className="flex-shrink-0" size={24} />
            <p className="h-6 w-16 flex-shrink-0 text-base font-normal">
              舉辦位置
            </p>
            <p className="flex-grow truncate text-base font-medium">
              {location}
            </p>
          </div>
          <div className="flex justify-start gap-4">
            <Building2 className="flex-shrink-0" size={24} />
            <p className="h-6 w-16 flex-shrink-0 text-base font-normal">
              主辦單位
            </p>
            <p className="flex-grow truncate text-base font-medium">
              {organizer}
            </p>
          </div>
        </div>

        <div className="flex h-7 items-center justify-start gap-2">
          <span className="text-lg font-bold">NT${pricing}</span>
          {discountLabel(discount)}
        </div>
        {isContinuous && <ContinuousCardField />}
      </div>
    );
  }
);
EventCard.displayName = 'EventCard';

export default EventCard;
