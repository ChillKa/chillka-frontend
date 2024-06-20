import { Large, P } from '@components/ui/typography';
import cn from '@lib/utils';
import { CalendarDays, Link as LinkIcon, MapPin, User } from 'lucide-react';
import Link from 'next/link';

type ActivitySectionProps = {
  className: string;
  category: string;
  name: string;
  type: string;
  location: string;
  address: string;
  unlimitedQuantity: boolean;
  participantCapacity: number;
  websiteName: string;
  websiteURL: string;
  summary: string;
  details: string;
};

const ActivitySection = ({
  className,
  category,
  name,
  type,
  location,
  address,
  unlimitedQuantity,
  participantCapacity,
  websiteName,
  websiteURL,
  summary,
  details,
}: ActivitySectionProps) => {
  return (
    <section className={cn('w-full text-primary', className)}>
      <div className="mb-4 w-fit bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:mb-6">
        {category}
      </div>
      <div className="text-3xl font-bold -tracking-[0.0075em] xl:text-5xl xl:-tracking-[0.012em]">
        {name}
      </div>
      <div className="mt-6 space-y-6 border-y py-6 xl:mt-12 xl:space-y-8 xl:py-12">
        <div className="flex">
          <CalendarDays className="h-8 w-8 xl:h-12 xl:w-12" />
          <div className="ml-6 xl:ml-10">
            <div className="text-xl font-bold -tracking-[0.005em] xl:text-2xl xl:-tracking-[0.006em]">
              活動時間
            </div>
            {/* date time */}
            <div className="mt-2 text-base font-medium xl:text-lg xl:font-bold">
              2024-07-20（六） 19:00 至 07-24（三） 23:00
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
              {type === '線上' ? '線上活動' : `${address}（${location}）`}
            </div>
          </div>
        </div>
        {!unlimitedQuantity && (
          <div className="flex">
            <User className="h-8 w-8 xl:h-12 xl:w-12" />
            <div className="ml-6 xl:ml-10">
              <div className="text-xl font-bold -tracking-[0.005em] xl:text-2xl xl:-tracking-[0.006em]">
                活動人數
              </div>
              <div className="mt-2 text-base font-medium xl:text-lg xl:font-bold">
                {participantCapacity}人
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
                href={websiteURL}
                target="_blank"
                className="underline underline-offset-2"
              >
                {websiteName}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b py-6 xl:py-12">
        <Large>{summary}</Large>
      </div>
      <div className="py-6 xl:py-12">
        <div className="text-2xl font-bold -tracking-[0.006em] xl:text-3xl xl:-tracking-[0.0075em]">
          活動說明
        </div>
        <P className="mt-4 xl:mt-6">{details}</P>
      </div>
    </section>
  );
};

export default ActivitySection;
