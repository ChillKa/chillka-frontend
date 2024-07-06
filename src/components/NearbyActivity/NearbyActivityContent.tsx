'use client';

import { Activity } from '@action/activity';
import EventCard, {
  FormatDate,
  SkeletonEventCard,
} from '@components/EventCard';
import { withErrorBoundaryAndSuspense } from '@components/hoc/WithErrorBoundaryAndSuspense';
import useMediaQuery from '@hooks/use-media-query';
import { format } from 'date-fns';

type NearbyActivityContentProps = {
  activities: Activity[];
};
const NearbyActivityContent = ({ activities }: NearbyActivityContentProps) => {
  const { matches: isDefault } = useMediaQuery();
  const eventsToShow = isDefault ? activities.slice(0, 3) : activities;
  return (
    <>
      {eventsToShow.map((activity) => (
        <EventCard
          key={activity._id}
          className="xl:w-[26rem]"
          link={activity._id}
          title={activity?.name}
          cover={activity?.thumbnail}
          summary={activity?.summary}
          startTime={
            format(
              new Date(activity.startDateTime),
              'MM.dd'
            ) as FormatDate<'YY.MM.DD'>
          }
          endTime={
            format(
              new Date(activity.endDateTime),
              'MM.dd'
            ) as FormatDate<'YY.MM.DD'>
          }
          attendeeCount={
            activity?.totalParticipantCapacity != null &&
            activity?.remainingTickets != null &&
            !Number.isNaN(
              activity.totalParticipantCapacity - activity.remainingTickets
            )
              ? activity.totalParticipantCapacity - activity.remainingTickets
              : 0
          }
          location={activity?.type === '線下' ? activity?.address : '線上'}
          organizer={activity.organizer?.contactName ?? '未知舉辦者'}
          ticketPrices={activity?.ticketPrice ?? []}
          discount={0}
          isCollected={activity?.collected}
        />
      ))}
    </>
  );
};

const fallback = (
  <>
    {Array.from({ length: 3 }).map((_, index) => {
      const num = index;
      return <SkeletonEventCard key={num} />;
    })}
  </>
);

export default withErrorBoundaryAndSuspense(NearbyActivityContent, fallback);
