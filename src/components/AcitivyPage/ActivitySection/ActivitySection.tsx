import SkeletonActivitySection from '@components/AcitivyPage/ActivitySection/SkeletonActivitySection';
import { Button } from '@components/ui/button';
import { Large, P } from '@components/ui/typography';
import { formatActivityTime } from '@lib/dateUtils';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import {
  CalendarDays,
  ChevronRight,
  Link as LinkIcon,
  MapPin,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

type ActivitySectionProps = {
  className: string;
};

const ActivitySection = ({ className }: ActivitySectionProps) => {
  const { data } = useActivityContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!data) return <SkeletonActivitySection />;

  const DUMMY_RECURRING = [
    '06.28 19:00',
    '07.04 19:00',
    '08.11 19:00',
    '08.11 19:00',
    '08.11 19:00',
    '07.04 19:00',
    '08.11 19:00',
    '08.11 19:00',
    '08.11 19:00',
  ];

  const renderRecuuringDateTime = () => {
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    };

    return (
      <div className="relative flex w-full overflow-hidden pt-2 xl:max-w-[41.125rem]">
        <div
          className="no-scrollbar flex w-full grow flex-nowrap gap-2 overflow-hidden overflow-x-auto"
          ref={scrollRef}
        >
          {DUMMY_RECURRING.map((date, index) => {
            return (
              <div
                key={date}
                className={`h-12 min-w-[8.4375rem] border border-primary px-6 py-3 ${DUMMY_RECURRING.length === index + 1 ? 'xl:mr-20' : ''}`}
              >
                {date}
              </div>
            );
          })}
        </div>
        {DUMMY_RECURRING.length >= 5 && (
          <div className="absolute right-0 top-1 hidden h-full items-center xl:flex">
            <div className="h-full w-12 bg-gradient-to-l from-surface to-transparent" />
            <Button
              className="h-12 w-12 border border-primary bg-surface p-4 text-primary"
              onClick={scrollRight}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className={cn('w-full text-primary', className)}>
      <div className="mb-4 w-fit bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:mb-6">
        {data.activity.category}
      </div>
      <div className="text-3xl font-bold -tracking-[0.0075em] xl:text-5xl xl:-tracking-[0.012em]">
        {data.activity.name}
      </div>
      <div className="mt-6 space-y-6 border-y py-6 xl:mt-12 xl:space-y-8 xl:py-12">
        <div className="flex">
          <CalendarDays className="h-8 w-8 xl:h-12 xl:w-12" />
          <div className="ml-6 w-full xl:ml-10">
            <div className="text-xl font-bold -tracking-[0.005em] xl:text-2xl xl:-tracking-[0.006em]">
              活動時間
            </div>
            <div className="w-full">
              <div className="mt-2 text-base font-medium xl:text-lg xl:font-bold">
                {formatActivityTime(
                  data.activity.startDateTime,
                  data.activity.endDateTime,
                  data.activity.noEndDate
                )}
              </div>
              {DUMMY_RECURRING.length !== 0 && renderRecuuringDateTime()}
            </div>
          </div>
        </div>
        <div className="flex">
          <MapPin className="h-8 w-8 xl:h-12 xl:w-12" />
          <div className="ml-6 xl:ml-10">
            <div className="text-xl font-bold -tracking-[0.005em] xl:text-2xl xl:-tracking-[0.006em]">
              舉辦位置
            </div>
            <div className="mt-2 text-base font-medium xl:text-lg xl:font-bold">
              {data.activity.type === '線上'
                ? '線上活動'
                : `${data.activity.address}（${data?.activity.location}）`}
            </div>
          </div>
        </div>
        {!data.activity.unlimitedQuantity && (
          <div className="flex">
            <User className="h-8 w-8 xl:h-12 xl:w-12" />
            <div className="ml-6 xl:ml-10">
              <div className="text-xl font-bold -tracking-[0.005em] xl:text-2xl xl:-tracking-[0.006em]">
                活動人數
              </div>
              <div className="mt-2 text-base font-medium xl:text-lg xl:font-bold">
                {data.activity.totalParticipantCapacity}人
              </div>
            </div>
          </div>
        )}
        <div className="flex">
          <LinkIcon className="h-8 w-8 xl:h-12 xl:w-12" />
          <div className="ml-6 xl:ml-10">
            <div className="text-xl font-bold -tracking-[0.005em] xl:text-2xl xl:-tracking-[0.006em]">
              相關連結
            </div>
            <div className="mt-2 text-base font-medium xl:text-lg xl:font-bold">
              <Link
                href={data.activity.organizer.websiteURL}
                target="_blank"
                className="underline underline-offset-2"
              >
                {data?.activity.organizer.websiteName}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b py-6 xl:py-12">
        <Large>{data.activity.summary}</Large>
      </div>
      <div className="py-6 xl:py-12">
        <div className="text-2xl font-bold -tracking-[0.006em] xl:text-3xl xl:-tracking-[0.0075em]">
          活動說明
        </div>
        <P className="mt-4 xl:mt-6">{data.activity.details}</P>
      </div>
    </section>
  );
};

export default ActivitySection;
