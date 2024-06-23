'use client';

import { Activity } from '@action/activity';
import AdvancedSearchBar from '@components/SearchBar/AdvancedSearchBar';
import SearchContentSection from '@components/search/SearchContentSection';
import useMediaQuery from '@hooks/use-media-query';
import { useState } from 'react';

type SearchClientProps = {
  results: Activity[];
};

const SearchClient = ({ results }: SearchClientProps) => {
  const { matches: isMobile } = useMediaQuery();
  const [currentShow, setCurrentShow] = useState<'results' | 'map'>('results');
  const [scrollPosition, setScrollPosition] = useState(0);

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
      <AdvancedSearchBar toggleCurrentShow={toggleShow} isMobile={isMobile} />

      <SearchContentSection results={results} currentShow={currentShow} />
    </>
  );
};

export default SearchClient;
