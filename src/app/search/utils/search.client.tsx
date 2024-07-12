'use client';

import { SearchResult } from '@action/activity';
import AdvancedSearchBar from '@components/search/SearchBar/AdvancedSearchBar';
import { useSearchView } from '@components/search/SearchBar/SearchViewProvider';
import { updateQueryString } from '@components/search/SearchBar/fields/utils';
import useMediaQuery from '@hooks/use-media-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import ResultItemsSection from './ResultItemsSection';
import ResultMapSection from './ResultMapSection';
import ResultsPagination from './ResultsPagination';

type SearchClientProps = {
  result: SearchResult;
};

const SearchClient = ({ result }: SearchClientProps) => {
  const { matches: isMobile } = useMediaQuery();
  const [scrollPosition, setScrollPosition] = useState(0);
  const { currentShow, setCurrentShow, centerId, setCenterId } =
    useSearchView();

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);

  const { activities, total } = result;
  const totalPage = Math.ceil(total / 5);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const currentParams = Object.fromEntries(searchParams.entries());
      const updatedQuery = updateQueryString({
        ...currentParams,
        page: newPage.toString(),
      });
      router.push(`/search?${updatedQuery}`);
    },
    [searchParams, router]
  );

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
    <>
      <AdvancedSearchBar toggleCurrentShow={toggleShow} />

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

            <ResultsPagination
              currentPage={currentPage}
              totalPage={totalPage}
              isMobile={isMobile}
              onClickPrev={() => handlePageChange(Math.max(currentPage - 1, 1))}
              onClickNext={() =>
                handlePageChange(Math.min(currentPage + 1, totalPage))
              }
              onPageChange={handlePageChange}
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
    </>
  );
};

export default SearchClient;