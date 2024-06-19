'use client';

import { H1, H2, H3, H4, Large, P } from '@components/ui/typography';
import useMediaQuery from '@hooks/use-media-query';
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
  participantCapacity,
  websiteName,
  websiteURL,
  summary,
  details,
}: ActivitySectionProps) => {
  const { matches: isMobile } = useMediaQuery();

  return (
    <section className={cn('w-full text-primary', className)}>
      <div className="mb-4 w-fit bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:mb-6">
        {category}
      </div>
      {isMobile ? <H2>{name}</H2> : <H1>{name}</H1>}
      <div className="mt-6 space-y-6 border-y py-6 xl:mt-12 xl:space-y-8 xl:py-12">
        <div className="flex">
          <CalendarDays size={isMobile ? 32 : 48} />
          <div className="ml-6 xl:ml-10">
            {isMobile ? <H4>活動時間</H4> : <H3>活動時間</H3>}
            {/* date time */}
            <div className="mt-2 text-base font-medium xl:text-lg xl:font-bold">
              2024-07-20（六） 19:00 至 07-24（三） 23:00
            </div>
          </div>
        </div>
        <div className="flex">
          <MapPin size={isMobile ? 32 : 48} />
          <div className="ml-6 xl:ml-10">
            {isMobile ? <H4>舉辦位置</H4> : <H3>舉辦位置</H3>}
            <div className="mt-2 text-base font-medium xl:text-lg xl:font-bold">
              {type === '線上' ? '線上活動' : `${address}（${location}）`}
            </div>
          </div>
        </div>
        <div className="flex">
          <User size={isMobile ? 32 : 48} />
          <div className="ml-6 xl:ml-10">
            {isMobile ? <H4>活動人數</H4> : <H3>活動人數</H3>}
            <div className="mt-2 text-base font-medium xl:text-lg xl:font-bold">
              {participantCapacity}人
            </div>
          </div>
        </div>
        <div className="flex">
          <LinkIcon size={isMobile ? 32 : 48} />
          <div className="ml-6 xl:ml-10">
            {isMobile ? <H4>相關連結</H4> : <H3>相關連結</H3>}
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
        {isMobile ? <H3>活動說明</H3> : <H2>活動說明</H2>}
        <P className="mt-4 xl:mt-6">{details}</P>
      </div>
    </section>
  );
};

export default ActivitySection;
