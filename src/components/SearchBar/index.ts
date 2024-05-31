import dynamic from 'next/dynamic';

const SearchBar = dynamic(() => import('./SearchBar'), {
  ssr: false,
});

export default SearchBar;
