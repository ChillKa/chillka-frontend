import { fetchActivity } from '@action/activity';
import { Large, P } from '@components/ui/typography';
import { formatActivityTime } from '@lib/dateUtils';
import cn from '@lib/utils';
import { CalendarDays, Link as LinkIcon, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { IAcitivityResponse } from 'src/types/activity';

type ActivitySectionProps = {
  className: string;
  activityId?: string;
  existingData?: IAcitivityResponse;
};

const ActivitySection = async ({
  className,
  activityId,
  existingData,
}: ActivitySectionProps) => {
  const response = await fetchActivity(activityId as string);
  const data = response.result ?? existingData!;

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
