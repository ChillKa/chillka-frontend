'use client';

import { H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { Building2, CalendarDays, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import { HTMLAttributes, useRef } from 'react';
import { FormatDate } from './EventCard-types';
import {
  ContinuousCardField,
  EventCardCoverSection,
  discountLabel,
} from './EventCard-utils';

export type SearchResultEventCardProps = {
  title?: string;
  cover?: string;
  summary?: string;
  startTime?: FormatDate<'YY.MM.DD'>;
  endTime?: string;
  attendeeCount?: number;
  isCollected?: boolean;
  location?: string;
  organizer?: string;
  pricing?: number;
  isContinuous?: boolean;
  discount?: number;
  link?: string;
  onHoverCard?: () => void;
};

const SearchResultEventCard = ({
  title = 'Unknown Title',
  cover = '/default.webp',
  summary = 'Unknown description',
  startTime = '1900.01.01',
  endTime = '1900.01.02',
  attendeeCount = 0,
  isCollected = false,
  location = 'Unknown location',
  organizer = 'Unknown Organizer',
  isContinuous = false,
  pricing = 0,
  discount = 0,
  link = '',
  onHoverCard,
}: SearchResultEventCardProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter: HTMLAttributes<HTMLDivElement>['onMouseEnter'] =
    () => {
      timerRef.current = setTimeout(() => {
        onHoverCard?.();
      }, 1000);
    };

  const handleMouseLeave: HTMLAttributes<HTMLDivElement>['onMouseLeave'] =
    () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

  return (
    <Link href={`/activity/${link}`}>
      {/* FIXME: Change to use button */}
      <div
        id="search-result-event-card"
        className={cn(
          'flex h-[19.125rem] w-full gap-6',
          'duration-1000 ease-in-out',
          'transition-shadow hover:shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)]',
          'transition-transform hover:translate-y-[-5px]'
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <EventCardCoverSection
          src={cover}
          alt="search-event-card-result-item"
          hoverEffect
          collected={isCollected}
          className="size-[19.125rem]"
          activityId={link}
        />

        <div className="flex h-full w-[32.875rem] flex-col items-stretch justify-start gap-4">
          <div id="activity-header" className="flex flex-col gap-2">
            <H3>{title}</H3>
            <p className="truncate text-sm font-normal">{summary}</p>
          </div>
          <div id="activity-info" className="flex flex-col gap-2">
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
          <div
            id="activity-pricing"
            className="flex h-7 items-center justify-start gap-2"
          >
            <span className="text-lg font-bold">NT${pricing}</span>
            {discountLabel(discount)}
          </div>
          {isContinuous && <ContinuousCardField />}
        </div>
      </div>
    </Link>
  );
};

export default SearchResultEventCard;
