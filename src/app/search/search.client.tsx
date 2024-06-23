'use client';

import { Activity } from '@action/activity';
import AdvancedSearchBar from '@components/SearchBar/AdvancedSearchBar';
import { SearchParams } from '@components/SearchBar/fields/utils';
import SearchContentSection from '@components/search/SearchContentSection';
import { useState } from 'react';

type SearchClientProps = {
  filteredParams: Partial<SearchParams>;
  results: Activity[];
};

const SearchClient = ({ filteredParams, results }: SearchClientProps) => {
  const [currentShow, setCurrentShow] = useState<'results' | 'map'>('results');

  const toggleShow = () => {
    console.log(currentShow);
    setCurrentShow((prev) => {
      return prev === 'results' ? 'map' : 'results';
    });
  };

  return (
    <>
      <AdvancedSearchBar
        filteredParams={filteredParams}
        toggleCurrentShow={toggleShow}
      />

      <SearchContentSection results={results} currentShow={currentShow} />
    </>
  );
};

export default SearchClient;
