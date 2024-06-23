'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import useMediaQuery from '@hooks/use-media-query';
import { Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdvancedSearchBarDesktop from './AdvancedSearchBarDesktop';
import AdvancedSearchBarMobile from './AdvancedSearchBarMobile';
import SearchProvider from './SearchProvider';
import {
  SearchParams,
  SearchParamsSchema,
  updateQueryString,
} from './fields/utils';

type AdvancedSearchBarProps = {
  filteredParams: Partial<SearchParams>;
  toggleCurrentShow: () => void;
};

const AdvancedSearchBar = ({
  filteredParams,
  toggleCurrentShow,
}: AdvancedSearchBarProps) => {
  const { matches: isMobile } = useMediaQuery();

  const router = useRouter();
  const handleSearchSubmit = (data: SearchParams) => {
    const queryString = updateQueryString(data);
    router.push(`/search?${queryString}`);
  };

  const handleClearFilter = (data: SearchParams) => {
    const queryString = updateQueryString(data);
    router.push(`/search?${queryString}`);
  };

  return (
    <SearchProvider<SearchParams>
      defaultValues={{
        keyword: '',
        location: '',
        category: '',
        sort: '相關性',
        ...filteredParams,
      }}
      resolver={zodResolver(SearchParamsSchema)}
    >
      {isMobile ? (
        <section className="borrder-primary fixed bottom-0 left-0 right-0 z-10 flex justify-between gap-2 border-t bg-surface px-3 py-4">
          <AdvancedSearchBarMobile
            onSearchSubmit={handleSearchSubmit}
            onClearFilter={handleClearFilter}
          />
          <button
            type="button"
            aria-label="Map button"
            className="h-14 w-14 border-[1px] border-primary bg-surface p-4 font-medium text-primary"
            onClick={() => {
              toggleCurrentShow();
            }}
          >
            <Map />
          </button>
        </section>
      ) : (
        <AdvancedSearchBarDesktop
          onSearchSubmit={handleSearchSubmit}
          onClearFilter={handleClearFilter}
        />
      )}
    </SearchProvider>
  );
};

export default AdvancedSearchBar;
