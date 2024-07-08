'use client';

import { H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import Link from 'next/link';
import { forwardRef, useMemo } from 'react';
import {
  ContinuousCardField,
  EventCardCoverSection,
  EventCardInfoSection,
  discountLabel,
} from './EventCard-utils';

type EventCardProps = {
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
  link?: string;
  discount?: number;
  className?: string;
  revalidate?: boolean;
};

const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  (
    {
      title = 'Unknown Title',
      cover = '/default.webp',
      summary = '快點來加入吧！',
      startTime,
      endTime,
      attendeeCount = 0,
      isCollected = false,
      location = 'Unknown location',
      organizer = 'Unknown Organizer',
      ticketPrices = [],
      isContinuous = false,
      link = '',
      discount = 0,
      className,
      revalidate,
    },
    ref
  ) => {
    const nearestTicket = useMemo(() => {
      if (!ticketPrices || ticketPrices.length === 0) return null;
      const now = Date.now();

      const ticketsWithTimeDiff = ticketPrices.map((ticket) => ({
        ...ticket,
        startTime: new Date(ticket.startDateTime).getTime(),
        timeDiff: Math.abs(new Date(ticket.startDateTime).getTime() - now),
      }));

      const minTimeDiff = Math.min(
        ...ticketsWithTimeDiff.map((t) => t.timeDiff)
      );

      return (
        ticketsWithTimeDiff.find((ticket) => ticket.timeDiff === minTimeDiff) ||
        null
      );
    }, [ticketPrices]);

    return (
      <Link href={`/activity/${link}`}>
        <div
          ref={ref}
          id="event-card"
          className={cn(
            'flex h-[35.25rem] w-full flex-col gap-8 pb-4 text-primary',
            'xl:max-w-[26rem]',
            'duration-1000 ease-in-out',
            'transition-shadow hover:shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)]',
            'transition-transform hover:translate-y-[-5px]',
            className
          )}
        >
          <EventCardCoverSection
            src={cover}
            collected={isCollected}
            activityId={link}
            revalidate={revalidate}
          />

          <div className="flex h-[5.5rem] w-full flex-col gap-4 px-4">
            <H3 className="truncate">{title}</H3>
            <p className="line-clamp-2 overflow-hidden text-ellipsis text-sm">
              {summary}
            </p>
          </div>

          <div className="flex h-[9rem] flex-col justify-between gap-4 px-4">
            <EventCardInfoSection
              startTime={startTime}
              endTime={endTime}
              attendeeCount={attendeeCount}
              location={location}
              organizer={organizer}
            />
          </div>

          <div className="flex h-7 items-center justify-start gap-2 px-4">
            {nearestTicket?.price !== undefined ? (
              <>
                <span className="text-lg font-bold">
                  {nearestTicket.price === 0
                    ? '免費'
                    : `NT$${nearestTicket.price}`}
                </span>
                {nearestTicket.price > 0 && discountLabel(discount)}
              </>
            ) : (
              <span className="text-lg font-bold">價格未定</span>
            )}
          </div>
          {isContinuous && <ContinuousCardField />}
        </div>
      </Link>
    );
  }
);
EventCard.displayName = 'EventCard';

export default EventCard;
