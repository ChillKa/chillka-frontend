'use client';

import { Activity } from '@action/activity';
import {
  IntersectionObserverEventCard,
  SearchResultEventCard,
} from '@components/EventCard';
import {
  SearchPagination,
  SearchPaginationProps,
  updateQueryString,
} from '@components/search/SearchBar';
import useMediaQuery from '@hooks/use-media-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { H4 } from '../ui/typography';
import SearchMapSection from './SearchMapSection';

export type SearchContentSectionProps = {
  results: Activity[];
  currentShow: 'results' | 'map';
  total?: number;
  totalPage?: number;
};
const SearchContentSection = ({
  results,
  currentShow,
  total = 0,
  totalPage = 1,
}: SearchContentSectionProps) => {
  const { matches: isMobile } = useMediaQuery();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
  const keyword = searchParams.get('keyword');

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

  const mapMarkers = useMemo(() => {
    const now = Date.now();

    return results
      .filter(
        (result): result is Activity =>
          typeof result.lat === 'number' &&
          typeof result.lng === 'number' &&
          Array.isArray(result.ticketPrice)
      )
      .map((result) => {
        const nearestTicket =
          result.ticketPrice.length > 0
            ? result.ticketPrice.reduce<{
                name: string;
                price: number;
                startDateTime: string;
                endDateTime: string;
              }>((nearest, current) => {
                const currentDiff = Math.abs(
                  new Date(current.startDateTime).getTime() - now
                );
                const nearestDiff = Math.abs(
                  new Date(nearest.startDateTime).getTime() - now
                );
                return currentDiff < nearestDiff ? current : nearest;
              }, result.ticketPrice[0])
            : null;

        return {
          lat: result.lat,
          lng: result.lng,
          id: result._id,
          pricing: nearestTicket ? nearestTicket.price : 0,
        };
      });
  }, [results]);
  const [centerId, setCenterId] = useState(results[0]?._id ?? '-1');

  return (
    <section
      id="result"
      className="flex w-full grow flex-row gap-6 px-3 xl:px-0"
    >
      {currentShow === 'results' && (
        <div
          id="result-list"
          className="lg:max-w-[53.5rem] mt-7 flex w-full flex-col gap-y-12"
        >
          <div
            id="result-keyword"
            className="flex w-full items-center justify-start"
          >
            <H4>
              「{keyword}」找到{total}個活動
            </H4>
          </div>
          {results.map((activity) => {
            return isMobile ? (
              <IntersectionObserverEventCard
                key={activity._id}
                link={activity._id}
                title={activity.name}
                cover={activity.thumbnail}
                description={activity.details}
                startTime={activity.startDateTime}
                endTime={activity.endDateTime}
                attendeeCount={
                  activity?.totalParticipantCapacity != null &&
                  activity?.remainingTickets != null &&
                  !Number.isNaN(
                    activity.totalParticipantCapacity -
                      activity.remainingTickets
                  )
                    ? activity.totalParticipantCapacity -
                      activity.remainingTickets
                    : 0
                }
                isCollected={activity.isCollected}
                location={
                  activity?.type === '線下' ? activity?.address : '線上'
                }
                organizer={activity.organizer?.contactName ?? '未知舉辦者'} // FIXME: Wait for backend fixed data
                ticketPrices={activity?.ticketPrice ?? []}
                isContinuous={activity.isContinuous}
                discount={0}
                className="h-auto gap-4"
                onVisibleTrigger={() => {
                  setCenterId(activity._id);
                }}
              />
            ) : (
              <SearchResultEventCard
                key={activity._id}
                link={activity._id}
                title={activity.name}
                cover={activity.thumbnail}
                summary={activity.summary}
                startTime={activity.startDateTime}
                endTime={activity.endDateTime}
                attendeeCount={
                  activity?.totalParticipantCapacity != null &&
                  activity?.remainingTickets != null &&
                  !Number.isNaN(
                    activity.totalParticipantCapacity -
                      activity.remainingTickets
                  )
                    ? activity.totalParticipantCapacity -
                      activity.remainingTickets
                    : 0
                }
                isCollected={activity.isCollected}
                location={
                  activity?.type === '線下' ? activity?.location : '線上'
                }
                organizer={activity.organizer?.contactName ?? '未知舉辦者'} // FIXME: Wait for backend fixed data
                ticketPrices={activity?.ticketPrice ?? []}
                isContinuous={activity.isContinuous}
                discount={0} // FIXME: remove, this is deprecated
                onHoverCard={() => {
                  setCenterId(activity._id);
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
