'use client';

import { Activity } from '@action/activity';
import { H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { cva } from 'class-variance-authority';
import {
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

export type ActivitySearchResultProps = { activity: Activity };

export const ActivitySearchResult = ({
  activity,
}: ActivitySearchResultProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { collected: isCollected } = activity;
  const [collected, setCollected] = useState(isCollected);

  const collectedVariants = cva(
    'absolute bottom-0 right-0 flex h-20 w-20 flex-col items-center justify-center gap-2 text-xs transition ease-out duration-300 font-medium leading-5',
    {
      variants: {
        collected: {
          true: 'bg-primary text-white',
          false: 'bg-surface text-black',
        },
      },
    }
  );

  const handleToggle = () => {
    setCollected((prev) => !prev);
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
      if (scrollContainerRef.current.scrollLeft <= 100) {
        setIsScrolled(false);
      }
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
      setIsScrolled(true);
    }
  };

  const discountLabel = (discount: number) => {
    if (discount === -1) {
      return <span className="bg-primary px-2 py-1 text-white">FREE</span>;
    }
    if (discount > 0) {
      return (
        <span className="bg-primary px-2 py-1 text-white">{discount}% OFF</span>
      );
    }
    return null;
  };

  return (
    <section className="flex h-[22.125rem] w-full items-center justify-start gap-6 py-6">
      <div className="relative size-[19.125rem]">
        <Image
          src={activity.thumbnail}
          alt="Descriptive Alt Text"
          layout="fill"
          objectFit="cover"
          className={cn('absolute left-0 top-0 h-full w-full')}
        />
        <button
          type="button"
          onClick={handleToggle}
          className={collectedVariants({ collected })}
        >
          {collected ? <Check /> : <Bookmark />}
          {collected ? '已收藏' : '收藏'}
        </button>
      </div>
      <div className="flex h-full w-[32.875rem] flex-col items-stretch justify-start gap-4">
        <div id="activity-header" className="flex flex-col gap-2">
          <H3>{activity.name}</H3>
          <p className="truncate text-sm font-normal">{activity.description}</p>
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
            <p className="flex-grow truncate text-base font-medium">
              {activity.attendance}
            </p>
          </div>
          <div className="flex justify-start gap-4">
            <MapPin className="flex-shrink-0" size={24} />
            <p className="h-6 w-16 flex-shrink-0 text-base font-normal">
              舉辦位置
            </p>
            <p className="flex-grow truncate text-base font-medium">
              {activity.location}
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
          <span className="text-lg font-bold">NT${activity.pricing}</span>
          {discountLabel(activity.discount)}
        </div>
        {activity.isContinuous && (
          <div id="activity-timing" className="relative flex flex-row gap-2">
            <div
              ref={scrollContainerRef}
              className="scrollbar-hide no-scrollbar flex flex-row gap-2 overflow-x-auto"
            >
              <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
                <p className="h-full w-full whitespace-nowrap text-base font-medium">
                  03.28 19:00
                </p>
              </div>
              <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
                <p className="h-full w-full whitespace-nowrap text-base font-medium">
                  03.28 19:00
                </p>
              </div>
              <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
                <p className="h-full w-full whitespace-nowrap text-base font-medium">
                  03.28 19:00
                </p>
              </div>
              <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
                <p className="h-full w-full whitespace-nowrap text-base font-medium">
                  03.28 19:00
                </p>
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

            {isScrolled && (
              <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
                <button
                  type="button"
                  aria-label="scroll-left"
                  className="size-12 border-[1px] bg-surface p-3"
                  onClick={handleScrollLeft}
                >
                  <ChevronLeft className="size-6" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export type ActivitiesListProps = { results: Activity[] };

const ActivitiesList = ({ results }: ActivitiesListProps) => {
  return (
    <div id="result-list">
      {results.map((activity) => (
        <ActivitySearchResult activity={activity} key={activity.id} />
      ))}
    </div>
  );
};

export default ActivitiesList;
