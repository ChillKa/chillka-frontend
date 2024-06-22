'use client';

import { Activity } from '@action/activity';
import useMediaQuery from '@hooks/use-media-query';
import cn from '@lib/utils';
import {
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { H3, H4 } from './ui/typography';

type ActivitySearchResultProps = { activity: Activity };
export const ActivitySearchResult = ({
  activity,
}: ActivitySearchResultProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  return (
    <section className="flex h-[22.125rem] w-full items-center justify-start gap-6 py-6">
      <div className="relative h-[19.125rem] w-[19.125rem]">
        <Image
          src={activity.thumbnail}
          alt="Descriptive Alt Text"
          layout="fill"
          objectFit="cover"
          className={cn('absolute left-0 top-0 h-full w-full')}
        />
      </div>
      <div className="flex h-full w-[32.875rem] flex-col items-stretch justify-start gap-4">
        <div id="activity-header" className="flex flex-col gap-2">
          <H3>{activity.name}</H3>
          <p className="truncate text-sm font-normal">Description</p>
        </div>
        <div id="activity-info" className="flex flex-col gap-2">
          <div className="flex justify-start gap-4">
            <CalendarDays className="flex-shrink-0" size={24} />
            <p className="h-6 w-16 flex-shrink-0 text-base font-normal">
              活動時間
            </p>
            <p className="flex-grow truncate text-base font-medium">
              {activity.startTime}-{activity.endTime}
            </p>
          </div>
          <div className="flex justify-start gap-4">
            <Users className="flex-shrink-0" size={24} />
            <p className="h-6 w-16 flex-shrink-0 text-base font-normal">
              參加人數
            </p>
            <p className="flex-grow truncate text-base font-medium">999</p>
          </div>
          <div className="flex justify-start gap-4">
            <MapPin className="flex-shrink-0" size={24} />
            <p className="h-6 w-16 flex-shrink-0 text-base font-normal">
              舉辦位置
            </p>
            <p className="flex-grow truncate text-base font-medium">
              台北市 / 信義區
            </p>
          </div>
          <div className="flex justify-start gap-4">
            <Building2 className="flex-shrink-0" size={24} />
            <p className="h-6 w-16 flex-shrink-0 text-base font-normal">
              主辦單位
            </p>
            <p className="flex-grow truncate text-base font-medium">
              {activity.organizerName}
            </p>
          </div>
        </div>
        <div
          id="activity-pricing"
          className="flex h-7 items-center justify-start gap-2"
        >
          <span className="text-lg font-bold">NT$100</span>
          <span className="bg-primary px-2 py-1 text-white">70% OFF</span>
        </div>
        <div id="activity-timing" className="relative flex flex-row gap-2">
          {/* TODO: Change to use array */}
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide no-scrollbar flex flex-row gap-2 overflow-x-auto"
          >
            <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
              <p className="h-full w-full text-base font-medium">03.2819:00</p>
            </div>
            <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
              <p className="h-full w-full text-base font-medium">03.2819:00</p>
            </div>
            <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
              <p className="h-full w-full text-base font-medium">03.2819:00</p>
            </div>
            <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
              <p className="h-full w-full text-base font-medium">03.2819:00</p>
            </div>
            <div id="placeholder-box" className="size-12 flex-shrink-0" />
          </div>

          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/5 bg-gradient-to-r from-transparent to-white" />

          <div className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center">
            <button
              type="button"
              aria-label="scroll-right"
              className="size-12 border-[1px] bg-surface p-3"
              onClick={handleScrollRight}
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

type ActivitiesListProps = { results: Activity[] };
const ActivitiesList = ({ results }: ActivitiesListProps) => {
  return (
    <>
      {results.map((activity) => (
        <ActivitySearchResult activity={activity} key={activity.id} />
      ))}
    </>
  );
};

export type SearchContentSectionProps = {
  results: Activity[];
};
const SearchContentSection = ({ results }: SearchContentSectionProps) => {
  const { matches: isMobile } = useMediaQuery();

  return (
    <section id="result" className="flex w-full grow flex-row gap-6">
      <div className="lg:max-w-[53.5rem] flex w-full flex-col">
        <div
          id="result-keyword"
          className="flex h-[4.75rem] w-full items-center justify-start"
        >
          <H4>「桌游」找到123個活動</H4>
        </div>
        <div id="result-list">
          <ActivitiesList results={results} />
        </div>
        <div
          id="pagination-stepper"
          className="flex justify-between gap-4 px-[8.031rem] py-12"
        >
          <span className="flex cursor-pointer items-center justify-center rounded-full p-3">
            <ChevronLeft className="size-4" />
          </span>
          <span className="flex size-10 cursor-pointer items-center justify-center rounded-full ">
            1
          </span>
          <span className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white">
            2
          </span>
          <span className="flex size-10 cursor-pointer items-center justify-center rounded-full ">
            3
          </span>
          <span className="flex cursor-pointer items-center justify-center rounded-full p-3">
            <ChevronRight className="size-4" />
          </span>
        </div>
      </div>
      {!isMobile && (
        <div className="debug w-full max-w-[26rem]">
          {/* TODO: get by result */}
          result map section
        </div>
      )}
    </section>
  );
};

export default SearchContentSection;
