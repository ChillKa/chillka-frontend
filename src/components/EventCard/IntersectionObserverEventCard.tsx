'use client';

import useIntersectionObserver from '@hooks/use-intersection-observer';
import EventCard from './EventCard';

type IntersectionObserverEventCardProps = {
  title: string;
  cover: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
  attendeeCount: number;
  isCollected: boolean;
  location: string;
  organizer: string;
  ticketPrices?: {
    name: string;
    price: number;
    startDateTime: string;
    endDateTime: string;
  }[];
  isContinuous?: boolean;
  link?: string;
  discount: number | undefined; // -1 is free, 0 is none discount, positive is off discount
  className?: string;
  onVisibleTrigger?: () => void;
};
const IntersectionObserverEventCard = (
  props: IntersectionObserverEventCardProps
) => {
  const { onVisibleTrigger, ...rootProps } = props;
  const ref = useIntersectionObserver(
    () => {
      onVisibleTrigger?.();
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    }
  );

  return <EventCard {...rootProps} ref={ref} />;
};

export default IntersectionObserverEventCard;
