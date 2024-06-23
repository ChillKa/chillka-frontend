'use client';

import { Activity } from '@action/activity';
import AdvancedSearchBar from '@components/SearchBar/AdvancedSearchBar';
import SearchContentSection from '@components/search/SearchContentSection';
import { useState } from 'react';

type SearchClientProps = {
  results: Activity[];
};

const SearchClient = ({ results }: SearchClientProps) => {
  const [currentShow, setCurrentShow] = useState<'results' | 'map'>('results');

  const toggleShow = () => {
    console.log(currentShow);
    setCurrentShow((prev) => {
      return prev === 'results' ? 'map' : 'results';
    });
  };

  return (
    <>
      <AdvancedSearchBar toggleCurrentShow={toggleShow} />

      <SearchContentSection results={results} currentShow={currentShow} />
    </>
  );
};

export default SearchClient;
