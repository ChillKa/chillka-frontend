'use client';

import { SearchResult } from '@action/activity';
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
import { zodResolver } from '@hookform/resolvers/zod';
import useMediaQuery from '@hooks/use-media-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ResultItemsSection from './ResultItemsSection';
import ResultMapSection from './ResultMapSection';

type SearchClientProps = {
  result: SearchResult;
  initialSearchParams: Partial<SearchParams>;
};

const SearchClient = ({ result, initialSearchParams }: SearchClientProps) => {
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
        ...initialSearchParams,
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
            <ResultItemsSection
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

        <ResultMapSection
          activities={activities}
          centerId={centerId}
          isMobile={isMobile}
          currentShow={currentShow}
        />
      </section>
    </SearchProvider>
  );
};

export default SearchClient;
