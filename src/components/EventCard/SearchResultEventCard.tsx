'use client';

import { H3 } from '@components/ui/typography';
import { Building2, CalendarDays, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { FormatDate } from './EventCard-types';
import {
  ContinuousCardField,
  EventCardCoverSection,
  discountLabel,
} from './EventCard-utils';

export type SearchResultEventCardProps = {
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
  discount: number;
};

const SearchResultEventCard = ({
  title,
  cover,
  description,
  startTime,
  endTime,
  attendeeCount,
  isCollected = false,
  location,
  organizer,
  isContinuous = false,
  pricing,
  discount,
}: SearchResultEventCardProps) => {
  const [collected, setCollected] = useState(isCollected);

  const handleToggle = () => {
    setCollected((prev) => !prev);
  };

  return (
    <div
      id="search-result-event-card"
      className="flex h-[19.125rem] w-full gap-6"
    >
      <EventCardCoverSection
        src={cover}
        alt="search-event-card-result-item"
        hoverEffect
        onToggle={handleToggle}
        collected={collected}
        className="size-[19.125rem]"
      />

      <div className="flex h-full w-[32.875rem] flex-col items-stretch justify-start gap-4">
        <div id="activity-header" className="flex flex-col gap-2">
          <H3>{title}</H3>
          <p className="truncate text-sm font-normal">{description}</p>
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
  );
};

export default SearchResultEventCard;
