'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdvancedSearchBarDesktop from './AdvancedSearchBarDesktop';
import AdvancedSearchBarMobile from './AdvancedSearchBarMobile';
import {
  SearchParams,
  SearchParamsSchema,
  updateQueryString,
} from './fields/utils';
import SearchProvider from './SearchProvider';

type AdvancedSearchBarProps = {
  isMobile: boolean;
  toggleCurrentShow: () => void;
};

const AdvancedSearchBar = ({
  toggleCurrentShow,
  isMobile,
}: AdvancedSearchBarProps) => {
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
        date: '',
        type: '',
        distance: '',
        page: '1',
        limit: '5',
        sort: '相關性',
      }}
      resolver={zodResolver(SearchParamsSchema)}
    >
      {isMobile ? (
        <section className="fixed bottom-0 left-0 right-0 z-10 flex justify-between gap-2 border-t border-primary bg-surface px-3 py-4">
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
