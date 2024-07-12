'use client';

import { SearchResult } from '@action/activity';
import { useSearchView } from '@components/search/SearchBar/SearchViewProvider';
import { updateQueryString } from '@components/search/SearchBar/fields/utils';
import useMediaQuery from '@hooks/use-media-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import ResultItemsSection from './ResultItemsSection';
import ResultsPagination from './ResultsPagination';

type SearchClientProps = {
  result: SearchResult;
};

const SearchClient = ({ result }: SearchClientProps) => {
  const { matches: isMobile } = useMediaQuery();
  const { currentShow, setCenterId } = useSearchView();

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

  return currentShow === 'results' ? (
    <div
      id="result-list"
      className="lg:max-w-[53.5rem] mt-7 flex w-full flex-col gap-y-12"
    >
      <ResultItemsSection
        results={activities}
        total={total}
        setCenterId={setCenterId}
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
  ) : null;
};

export default SearchClient;
