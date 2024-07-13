'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type SearchViewContextType = {
  currentShow: 'results' | 'map';
  setCurrentShow: React.Dispatch<React.SetStateAction<'results' | 'map'>>;
  centerId: string;
  setCenterId: React.Dispatch<React.SetStateAction<string>>;
};

const SearchViewContext = createContext<SearchViewContextType | undefined>(
  undefined
);

export const useSearchView = () => {
  const context = useContext(SearchViewContext);
  if (context === undefined) {
    throw new Error('useSearchView must be used within a SearchViewProvider');
  }
  return context;
};

type SearchViewProviderProps = {
  children: React.ReactNode;
};

const SearchViewProvider: React.FC<SearchViewProviderProps> = ({
  children,
}) => {
  const [currentShow, setCurrentShow] = useState<'results' | 'map'>('results');
  const [centerId, setCenterId] = useState('-1');

  const contextValue = useMemo(
    () => ({ currentShow, setCurrentShow, centerId, setCenterId }),
    [currentShow, centerId]
  );

  return (
    <SearchViewContext.Provider value={contextValue}>
      {children}
    </SearchViewContext.Provider>
  );
};
export default SearchViewProvider;
