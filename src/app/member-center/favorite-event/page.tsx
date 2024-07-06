import EventCard, { FormatDate } from '@components/EventCard';
import { Lead } from '@components/ui/typography';
import { format } from 'date-fns';
import { getFavoriteActivities } from './utils/action';

const FavoriteEvent = async () => {
  const result = await getFavoriteActivities();
  const { activities } = result;

  return (
    <div className="relative text-primary">
      <h1 className="mb-6 h-[5rem] border-b-[0.0625rem] text-5xl/none font-bold xl:h-[6.25rem]">
        收藏活動
      </h1>
      <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-5">
        {activities.length === 0 ? (
          <Lead>目前尚無收藏任何活動</Lead>
        ) : (
          activities.map((activity) => (
            <EventCard
              key={activity._id}
              link={activity._id}
              title={activity.name}
              cover={activity.thumbnail}
              summary={activity.summary}
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
                  ? activity.totalParticipantCapacity -
                    activity.remainingTickets
                  : 0
              }
              location={activity.type === '線下' ? activity.location : '線上'}
              organizer={activity.organizer.name}
              isCollected
              revalidate
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteEvent;
