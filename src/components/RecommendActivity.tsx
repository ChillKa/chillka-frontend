import { fetchRecommendedActivity } from '@action/activity';
import EventCard, {
  FormatDate,
  SkeletonEventCard,
} from '@components/EventCard';
import { Button } from '@components/ui/button';
import { H1 } from '@components/ui/typography';
import cn from '@lib/utils';
import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import ErrorBoundarySection from './error/ErrorBoundarySection';

type RecommendActivityProps = {
  className: string;
};

const RecommendActivity = async ({ className }: RecommendActivityProps) => {
  const data = await fetchRecommendedActivity();
  const { activities } = data;

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
        <H1>推薦活動</H1>
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
      <div className="flex w-full flex-col justify-between space-y-12 xl:flex-row xl:space-y-0">
        <ErrorBoundarySection>
          <Suspense
            fallback={
              <>
                {Array.from({ length: 3 }).map((_, index) => {
                  const id = index;
                  return <SkeletonEventCard key={id} />;
                })}
              </>
            }
          >
            {activities.map((activity) => (
              <EventCard
                className="w-[26rem]"
                key={activity._id}
                link={activity._id}
                title={activity?.name}
                cover={activity?.thumbnail}
                description={activity?.summary}
                startTime={
                  format(
                    new Date(activity.startDateTime),
                    'MM.dd'
                  ) as FormatDate<'YY.MM.DD'>
                }
                endTime={format(new Date(), 'MM.dd') as FormatDate<'YY.MM.DD'>}
                attendeeCount={activity?.participantNumber}
                location={activity?.location}
                organizer={activity?.organizerName}
                pricing={activity?.ticketPrice[0]?.price}
                discount={activity?.discount}
                isCollected={activity?.collected}
              />
            ))}
          </Suspense>
        </ErrorBoundarySection>
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
            查看更多推薦活動
            <ArrowUpRight size={16} />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default RecommendActivity;
