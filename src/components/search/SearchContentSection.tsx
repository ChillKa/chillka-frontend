'use client';

import { Activity } from '@action/activity';
import EventCard, {
  FormatDate,
  SearchResultEventCard,
} from '@components/EventCard';
import useMediaQuery from '@hooks/use-media-query';
import { useState } from 'react';
import Pagination, {
  PaginationNext,
  PaginationPrev,
  generatePaginationItems,
} from '../Pagination';
import { H4 } from '../ui/typography';
import SearchMapSection from './SearchMapSection';

export type SearchContentSectionProps = {
  results: Activity[];
  currentShow: 'results' | 'map';
};
const SearchContentSection = ({
  results,
  currentShow,
}: SearchContentSectionProps) => {
  const { matches: isMobile } = useMediaQuery();
  const totalPage = 99;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));
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

          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onClickPrev={handlePrevClick}
            onClickNext={handleNextClick}
            asChild
          >
            <div
              id="pagination-stepper"
              className="flex justify-between gap-4 px-[8.031rem] py-12"
            >
              <PaginationPrev />
              {generatePaginationItems(currentPage, totalPage)}
              <PaginationNext />
            </div>
          </Pagination>
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
