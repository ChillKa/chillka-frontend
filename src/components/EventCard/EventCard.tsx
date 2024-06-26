'use client';

import { H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { Building2, CalendarDays, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import { forwardRef, useState } from 'react';
import { FormatDate } from './EventCard-types';
import {
  ContinuousCardField,
  EventCardCoverSection,
  discountLabel,
} from './EventCard-utils';

type EventCardProps = {
  title?: string;
  cover?: string;
  description?: string;
  startTime?: FormatDate<'YY.MM.DD'>;
  endTime?: string;
  attendeeCount?: number;
  isCollected?: boolean;
  location?: string;
  organizer?: string;
  pricing?: number;
  isContinuous?: boolean;
  link?: string;
  discount?: number; // -1 is free, 0 is none discount, positive is off discount
  className?: string;
};

const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  (
    {
      title = 'Unknown Title',
      cover = '/default.webp',
      description = 'Unknown description',
      startTime = '1900.01.01',
      endTime = '1900.01.02',
      attendeeCount = 0,
      isCollected = false,
      location = 'Unknown location',
      organizer = 'Unknown Organizer',
      pricing = 0,
      isContinuous = false,
      link = '',
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
      <Link href={`/activity/${link}`}>
        <div
          ref={ref}
          id="event-card"
          className={cn(
            'flex h-[35.25rem] w-full flex-col gap-8 text-primary',
            'xl:max-w-[26rem]',
            'duration-1000 ease-in-out',
            'transition-shadow hover:shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)]',
            'transition-transform hover:translate-y-[-5px]',
            className
          )}
        >
          <EventCardCoverSection
            src={cover}
            collected={collected}
            onToggle={handleToggle}
          />

          <div className="flex h-[5.5rem] w-full flex-col gap-4">
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
      </Link>
    );
  }
);
EventCard.displayName = 'EventCard';

export default EventCard;
