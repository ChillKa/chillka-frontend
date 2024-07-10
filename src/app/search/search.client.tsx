'use client';

import { Activity, SearchResult } from '@action/activity';
import {
  SearchPagination,
  SearchPaginationProps,
} from '@components/search/SearchBar';
import AdvancedSearchBar from '@components/search/SearchBar/AdvancedSearchBar';
import {
  SearchParams,
  SearchParamsSchema,
  updateQueryString,
} from '@components/search/SearchBar/fields/utils';
import SearchProvider from '@components/search/SearchBar/SearchProvider';
import SearchContentSection from '@components/search/SearchContentSection';
import SearchMapSection from '@components/search/SearchMapSection';
import { zodResolver } from '@hookform/resolvers/zod';
import useMediaQuery from '@hooks/use-media-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

type SearchClientProps = {
  result: SearchResult;
};

const SearchClient = ({ result }: SearchClientProps) => {
  const { matches: isMobile } = useMediaQuery();
  const [currentShow, setCurrentShow] = useState<'results' | 'map'>('results');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [centerId, setCenterId] = useState(result.activities[0]?._id ?? '-1');

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);

  const { activities, total } = result;
  const totalPage = Math.ceil(total / 5);

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

    return activities
      .filter(
        (currentResult): currentResult is Activity =>
          typeof currentResult.lat === 'number' &&
          typeof currentResult.lng === 'number' &&
          Array.isArray(currentResult.ticketPrice)
      )
      .map((activity) => {
        const nearestTicket =
          activity.ticketPrice.length > 0
            ? activity.ticketPrice.reduce<{
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
              }, activity.ticketPrice[0])
            : null;

        return {
          lat: activity.lat,
          lng: activity.lng,
          id: activity._id,
          pricing: nearestTicket ? nearestTicket.price : 0,
        };
      });
  }, [activities]);

  const toggleShow = () => {
    if (isMobile) {
      if (currentShow === 'results') {
        setScrollPosition(window.scrollY);
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, scrollPosition);
      }
    }
    setCurrentShow((prev) => (prev === 'results' ? 'map' : 'results'));
  };

  return (
    <SearchProvider<SearchParams>
      defaultValues={{
        keyword: '',
        location: '',
        category: '',
        date: '',
        type: '',
        distance: '',
        page: '1',
        limit: '5',
        sort: '相關性',
      }}
      resolver={zodResolver(SearchParamsSchema)}
    >
      <AdvancedSearchBar toggleCurrentShow={toggleShow} isMobile={isMobile} />

      <section
        id="result"
        className="flex w-full grow flex-row gap-6 px-3 xl:px-0"
      >
        {currentShow === 'results' ? (
          <div
            id="result-list"
            className="lg:max-w-[53.5rem] mt-7 flex w-full flex-col gap-y-12"
          >
            <SearchContentSection
              results={activities}
              total={total}
              setCenterId={setCenterId}
              currentShow={currentShow}
            />
            <SearchPagination
              initialPage={currentPage}
              totalPage={totalPage}
              isMobile={isMobile}
              onClickPrev={handleClickPrev}
              onClickNext={handleClickNext}
            />
          </div>
        ) : null}

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
    </SearchProvider>
  );
};

export default SearchClient;
