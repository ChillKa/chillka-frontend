'use client';

import { Activity } from '@action/activity';
import EventCard, {
  FormatDate,
  SearchResultEventCard,
} from '@components/EventCard';
import {
  SearchPagination,
  SearchPaginationProps,
  updateQueryString,
} from '@components/SearchBar';
import useMediaQuery from '@hooks/use-media-query';
import { useRouter, useSearchParams } from 'next/navigation';
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
              <EventCard
                key={activity.id}
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
              />
            ) : (
              <SearchResultEventCard
                key={activity.id}
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
              />
            );
          })}

          <SearchPagination
            initialPage={currentPage}
            totalPage={totalPage}
            onClickPrev={handleClickPrev}
            onClickNext={handleClickNext}
          />
        </div>
      )}
      {currentShow === 'map' && (
        <div className="h-fit w-full">
          <SearchMapSection
            markers={[
              { lat: 25.033, lng: 121.5654, id: '1', pricing: 100 },
              { lat: 24.1477, lng: 120.6736, id: '2', pricing: 0 },
              { lat: 22.6273, lng: 120.3014, id: '3', pricing: 0 },
            ]}
          />
        </div>
      )}
      {!isMobile && (
        <div className="sticky top-0 h-fit w-full max-w-[26rem]">
          <SearchMapSection
            markers={[
              { lat: 25.033, lng: 121.5654, id: '1', pricing: 100 },
              { lat: 24.1477, lng: 120.6736, id: '2', pricing: 0 },
              { lat: 22.6273, lng: 120.3014, id: '3', pricing: 0 },
            ]}
          />
        </div>
      )}
    </section>
  );
};

export default SearchContentSection;
