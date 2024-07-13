'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import SearchBarDesktop from './SearchBarDesktop';
import SearchBarMobile from './SearchBarMobile';
import SearchProvider, { useSearchProvider } from './SearchProvider';
import { categories, locations } from './fields/utils';

export const searchSchema = z.object({
  keyword: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
});

export type SearchFormValues = z.infer<typeof searchSchema>;

const createQueryString = (data: {
  keyword: string;
  location: string;
  category: string;
}) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    params.set(key, value);
  });
  return params.toString();
};

type SearchBarContainerProps = {
  className?: string;
};
const SearchBarContainer = ({ className }: SearchBarContainerProps) => {
  const { isMobile } = useSearchProvider();
  const router = useRouter();

  const handleSearchSubmit = async (data: any) => {
    const queryString = createQueryString(data);
    router.push(`/search?${queryString}`);
  };

  return isMobile ? (
    <SearchBarMobile
      className=""
      locations={locations}
      categories={categories}
      onSearchSubmit={handleSearchSubmit}
    />
  ) : (
    <SearchBarDesktop
      className={className}
      locations={locations}
      categories={categories}
      onSearchSubmit={handleSearchSubmit}
    />
  );
};

type SearchBarProps = {} & SearchBarContainerProps;
const SearchBar = ({ className = '' }: SearchBarProps) => {
  return (
    <SearchProvider defaultValues={{ keyword: '', location: '', category: '' }}>
      <SearchBarContainer className={className} />
    </SearchProvider>
  );
};

export default SearchBar;
