'use client';

import { SearchResult } from '@action/activity';
import { useSearchView } from '@components/search/SearchBar/SearchViewProvider';
import ResultItemsSection from './ResultItemsSection';

type SearchClientProps = {
  result: SearchResult;
};

const SearchClient = ({ result }: SearchClientProps) => {
  const { currentShow, setCenterId } = useSearchView();
  const { activities, total } = result;

  return currentShow === 'results' ? (
    <div
      id="result-list"
      className="mt-7 flex w-full flex-col gap-y-12 xl:max-w-[53.5rem]"
    >
      <ResultItemsSection
        results={activities}
        total={total}
        setCenterId={setCenterId}
      />
    </div>
  ) : null;
};

export default SearchClient;
