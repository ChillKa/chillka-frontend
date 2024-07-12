import { getActivitiesByFilter, getFavoriteActivities } from '@action/activity';
import { isLoggedIn } from '@action/auth';
import { Button } from '@components/ui/button';
import { H1 } from '@components/ui/typography';
import cn from '@lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import NearbyActivityContent from './NearbyActivityContent';

type NearbyActivityProps = {
  className: string;
};

const NearbyActivity = async ({ className }: NearbyActivityProps) => {
  const loggedIn = await isLoggedIn();
  const lat = cookies().get('lat')?.value ?? '121.5598';
  const lng = cookies().get('lng')?.value ?? '25.09108';

  const activitiesData = await getActivitiesByFilter(
    {
      lat,
      lng,
      limit: '6',
    },
    { next: { revalidate: 1800 } }
  );

  let { activities = [] } = activitiesData;

  if (loggedIn) {
    const favoriteActivities = await getFavoriteActivities();
    const favoriteActivityIds = new Set(
      favoriteActivities.activities.map((activity) => activity._id)
    );

    activities = activities.map((activity) => ({
      ...activity,
      isCollected: favoriteActivityIds.has(activity._id),
    }));
  } else {
    activities = activities.map((activity) => ({
      ...activity,
      isCollected: false,
    }));
  }

  return (
    <section
      className={cn(
        'mx-auto',
        'w-full p-[12.5px] text-primary',
        'xl:w-[81rem] xl:p-0',
        className
      )}
    >
      <div className="flex w-full items-start justify-between">
        <H1>附近活動</H1>
        <Link href="/search">
          <button
            type="button"
            className={cn(
              'relative hidden h-12 w-24 justify-between px-0 pb-4 pt-2 font-medium',
              'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:border-t after:bg-primary',
              'after:transition-colors after:duration-300 after:ease-out hover:after:border-primary',
              'xl:flex'
            )}
          >
            查看更多
            <ArrowUpRight />
          </button>
        </Link>
      </div>
      <hr className="mb-12 mt-12 w-12 border-t-2 border-primary" />
      <div
        className={cn(
          'flex w-full flex-col justify-between space-y-12',
          'xl:flex-row xl:flex-wrap xl:gap-6 xl:gap-y-12 xl:space-y-0'
        )}
      >
        <NearbyActivityContent activities={activities} />

        <Link href="/search">
          <Button
            variant="outline"
            className={cn(
              'flex h-14 w-full items-center justify-center gap-4',
              'border border-primary px-8 py-4',
              'text-base font-medium text-primary',
              'xl:hidden',
              'transition-colors hover:bg-primary hover:fill-surface hover:text-surface'
            )}
          >
            查看更多附近活動
            <ArrowUpRight size={16} />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NearbyActivity;
