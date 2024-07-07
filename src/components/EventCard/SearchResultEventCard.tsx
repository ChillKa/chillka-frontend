'use client';

import { H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import Link from 'next/link';
import { HTMLAttributes, useMemo, useRef } from 'react';
import {
  ContinuousCardField,
  EventCardCoverSection,
  EventCardInfoSection,
  discountLabel,
} from './EventCard-utils';

export type SearchResultEventCardProps = {
  title?: string;
  cover?: string;
  summary?: string;
  startTime?: string | Date;
  endTime?: string | Date;
  attendeeCount?: number;
  isCollected?: boolean;
  location?: string;
  organizer?: string;
  ticketPrices?: {
    name: string;
    price: number;
    startDateTime: string;
    endDateTime: string;
  }[];
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
  ticketPrices = [],
  discount = 0,
  link = '',
  onHoverCard,
}: SearchResultEventCardProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const nearestTicket = useMemo(() => {
    if (!ticketPrices || ticketPrices.length === 0) return null;
    const now = Date.now();

    const ticketsWithTimeDiff = ticketPrices.map((ticket) => ({
      ...ticket,
      startTime: new Date(ticket.startDateTime).getTime(),
      timeDiff: Math.abs(new Date(ticket.startDateTime).getTime() - now),
    }));

    const minTimeDiff = Math.min(...ticketsWithTimeDiff.map((t) => t.timeDiff));

    return (
      ticketsWithTimeDiff.find((ticket) => ticket.timeDiff === minTimeDiff) ||
      null
    );
  }, [ticketPrices]);

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
            <EventCardInfoSection
              startTime={format(new Date(startTime), 'MM.dd EE ', {
                locale: zhTW,
              })}
              endTime={format(new Date(endTime), ' MM.dd EE', { locale: zhTW })}
              attendeeCount={attendeeCount}
              location={location}
              organizer={organizer}
            />
          </div>
          <div className="flex h-7 items-center justify-start gap-2">
            {nearestTicket && nearestTicket.price > 0 ? (
              <>
                <span className="text-lg font-bold">
                  NT${nearestTicket.price}
                </span>
                {discountLabel(discount)}
              </>
            ) : (
              <span className="text-lg font-bold">價格未定</span>
            )}
          </div>
          {isContinuous && <ContinuousCardField />}
        </div>
      </div>
    </Link>
  );
};

export default SearchResultEventCard;
