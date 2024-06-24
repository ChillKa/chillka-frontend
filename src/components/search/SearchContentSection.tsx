'use client';

import { Activity } from '@action/activity';
import {
  FormatDate,
  IntersectionObserverEventCard,
  SearchResultEventCard,
} from '@components/EventCard';
import {
  SearchPagination,
  SearchPaginationProps,
  updateQueryString,
} from '@components/SearchBar';
import useMediaQuery from '@hooks/use-media-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { H4 } from '../ui/typography';
import SearchMapSection from './SearchMapSection';

export type SearchContentSectionProps = {
  results: Activity[];
  currentShow: 'results' | 'map';
  totalPage?: number;
};
const SearchContentSection = ({
  results,
  currentShow,
  totalPage = 5,
}: SearchContentSectionProps) => {
  const { matches: isMobile } = useMediaQuery();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);

  const handleClickPrev: SearchPaginationProps['onClickPrev'] = (page) => {
    const newPage = Math.max(page - 1, 1);
    const updatedQuery = updateQueryString({
      ...searchParams.entries(),
      page: newPage.toString(),
    });
    router.push(`/search?${updatedQuery}`);
  };

  const handleClickNext: SearchPaginationProps['onClickNext'] = (page) => {
    const newPage = Math.min(page + 1, totalPage);
    const updatedQuery = updateQueryString({
      ...searchParams.entries(),
      page: newPage.toString(),
    });
    router.push(`/search?${updatedQuery}`);
  };

  const mapMarkers = results.map((result) => ({
    lat: result.lat,
    lng: result.lng,
    id: result.id,
    pricing: result.pricing,
  }));
  const [centerId, setCenterId] = useState(results[0].id);

  return (
    <section id="result" className="flex w-full grow flex-row gap-6">
      {currentShow === 'results' && (
        <div
          id="result-list"
          className="lg:max-w-[53.5rem] mt-7 flex w-full flex-col gap-y-12"
        >
          <div
            id="result-keyword"
            className="flex w-full items-center justify-start"
          >
            <H4>「桌游」找到123個活動</H4>
          </div>
          {results.map((activity) => {
            return isMobile ? (
              <IntersectionObserverEventCard
                key={activity.id}
                link="123" // FIXME: change to use activity link
                title={activity.name}
                cover={activity.thumbnail}
                description={activity.description}
                startTime={activity.startTime as FormatDate<'YY.MM.DD'>}
                endTime={activity.endTime as FormatDate<'YY.MM.DD'>}
                attendeeCount={activity.attendance}
                isCollected={activity.collected}
                location={activity.location}
                organizer={activity.organizerName}
                pricing={activity.pricing}
                isContinuous={activity.isContinuous}
                discount={activity.discount}
                className="gap-4"
                onVisibleTrigger={() => {
                  setCenterId(activity.id);
                }}
              />
            ) : (
              <SearchResultEventCard
                key={activity.id}
                link="123" // FIXME: change to use activity link
                title={activity.name}
                cover={activity.thumbnail}
                description={activity.description}
                startTime={activity.startTime as FormatDate<'YY.MM.DD'>}
                endTime={activity.endTime as FormatDate<'YY.MM.DD'>}
                attendeeCount={activity.attendance}
                isCollected={activity.collected}
                location={activity.location}
                organizer={activity.organizerName}
                pricing={activity.pricing}
                isContinuous={activity.isContinuous}
                discount={activity.discount}
                onHoverCard={() => {
                  setCenterId(activity.id);
                }}
              />
            );
          })}

          <SearchPagination
            initialPage={currentPage}
            totalPage={totalPage}
            isMobile={isMobile}
            onClickPrev={handleClickPrev}
            onClickNext={handleClickNext}
          />
        </div>
      )}
      {isMobile && currentShow === 'map' && (
        <div className="h-fit w-full">
          <SearchMapSection centerId={centerId} markers={mapMarkers} />
        </div>
      )}
      {!isMobile && (
        <div className="sticky top-0 h-fit w-full max-w-[26rem]">
          <SearchMapSection centerId={centerId} markers={mapMarkers} />
        </div>
      )}
    </section>
  );
};

export default SearchContentSection;
