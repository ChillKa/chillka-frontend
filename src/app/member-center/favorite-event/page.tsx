'use client';

import EventCard, { FormatDate } from '@components/EventCard';
import { Lead } from '@components/ui/typography';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { IActivity } from 'src/types/activity';
import { getFavoriteActivities } from './utils/action';

const FavoriteEvent = () => {
  const [favotiteActivities, setFavotiteActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFavoriteActivities = async () => {
    const result = await getFavoriteActivities();
    const { activities } = result;
    setFavotiteActivities(activities);
    setLoading(false);
  };

  useEffect(() => {
    fetchFavoriteActivities();
  }, []);

  return (
    <div className="relative text-primary">
      <h1 className="mb-6 h-[5rem] border-b-[0.0625rem] text-5xl/none font-bold xl:h-[6.25rem]">
        收藏活動
      </h1>
      {loading ? (
        <Lead>Loading...</Lead>
      ) : (
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-5">
          {favotiteActivities.length === 0 ? (
            <Lead>目前尚無收藏任何活動</Lead>
          ) : (
            favotiteActivities.map((activity) => (
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
                attendeeCount={activity.participantAmount}
                location={activity.location}
                organizer={activity.organizer.name}
                // pricing={activity.pricing}
                // discount={activity.discount}
                isCollected
                callbackFunc={fetchFavoriteActivities}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteEvent;
