'use client';

import { Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdvancedSearchBarDesktop from './AdvancedSearchBarDesktop';
import AdvancedSearchBarMobile from './AdvancedSearchBarMobile';
import { useSearchProvider } from './SearchProvider';
import { SearchParams, updateQueryString } from './fields/utils';

type AdvancedSearchBarProps = {
  toggleCurrentShow: () => void;
};

const AdvancedSearchBar = ({ toggleCurrentShow }: AdvancedSearchBarProps) => {
  const router = useRouter();
  const { isMobile, ...formMethods } = useSearchProvider<SearchParams>();
  const handleSearchSubmit = (data: SearchParams) => {
    const queryString = updateQueryString(data);
    router.push(`/search?${queryString}`);
  };

  const handleClearFilter = () => {
    formMethods.reset({
      keyword: '',
      location: '',
      category: '',
      date: '',
      type: '',
      distance: '',
      page: '1',
      sort: '相關性',
      limit: '5',
    });
    const clearedParams = updateQueryString({
      limit: '5',
      page: '1',
    });
    router.push(`/search?${clearedParams}`);
  };

  return isMobile ? (
    <section className="fixed bottom-0 left-0 right-0 z-10 flex justify-between gap-2 border-t border-primary bg-surface px-3 py-4">
      <AdvancedSearchBarMobile
        onSearchSubmit={handleSearchSubmit}
        onClearFilter={() => handleClearFilter}
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
      onClearFilter={() => handleClearFilter}
    />
  );
};

export default AdvancedSearchBar;
