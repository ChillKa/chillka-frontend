'use client';

import { SearchResult } from '@action/activity';
import AdvancedSearchBar from '@components/search/SearchBar/AdvancedSearchBar';
import SearchContentSection from '@components/search/SearchContentSection';
import useMediaQuery from '@hooks/use-media-query';
import { useState } from 'react';

type SearchClientProps = {
  result: SearchResult;
};

const SearchClient = ({ result }: SearchClientProps) => {
  const { matches: isMobile } = useMediaQuery();
  const [currentShow, setCurrentShow] = useState<'results' | 'map'>('results');
  const [scrollPosition, setScrollPosition] = useState(0);

  const { activities, total } = result;
  const totalPage = Math.ceil(total / 5);

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

      <SearchContentSection
        results={activities}
        total={total}
        totalPage={totalPage}
        currentShow={currentShow}
      />
    </>
  );
};

export default SearchClient;
