import useIntersectionObserver from '@hooks/use-intersection-observer';
import EventCard from './EventCard';
import { FormatDate } from './EventCard-types';

type IntersectionObserverEventCardProps = {
  title: string;
  cover: string;
  description: string;
  startTime: FormatDate<'YY.MM.DD'>;
  endTime: FormatDate<'YY.MM.DD'>;
  attendeeCount: number;
  isCollected: boolean;
  location: string;
  organizer: string;
  pricing: number;
  isContinuous?: boolean;
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
