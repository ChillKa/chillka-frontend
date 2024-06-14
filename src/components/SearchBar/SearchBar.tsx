/*
- [x] add a hook for mobile verstion detection
- [x] add modal component from shadcn
- [x] built-up mobile version
  - [x] modal title
  - [x] modal content
- [x] feature: add framer motion
  - [x] add animation on menu items
- [x] mobile:
  - [x] add animation
  - [x] modify menu animation
  - [x] set hover effect propperly
- [] desktop

*/

'use client';

import { Form } from '@components/ui/form';
import useMediaQuery from '@hooks/use-media-query';
import cn from '@lib/utils';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import SearchBarDesktop from './SearchBarDesktop';
import SearchBarMobile from './SearchBarMobile';
import { categories, locations } from './fields/utils';

//
const debugMode = false;

const DUMMY_PICTURES = [
  {
    thumbnail:
      'https://images.unsplash.com/photo-1546484458-6904289cd4f0?q=100&w=416&h=fit&fm=webp',
    url: '/',
    description: '夕陽海灘派對',
  },
  {
    thumbnail:
      'https://plus.unsplash.com/premium_photo-1663099746128-34ea20ac094d?q=100&w=416&h=fit&fm=webp',
    url: '/',
    description: '城市探險尋寶',
  },
  {
    thumbnail:
      'https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?q=100&w=416&h=fit&fm=webp',
    url: '/',
    description: '極光露營體驗',
  },
];

const DUMMY_KEYWORDS = [
  {
    url: 'https://www.google.com',
    keyword: '露營',
  },
  {
    url: 'https://www.google.com',
    keyword: '酒精路跑',
  },
  {
    url: 'https://www.google.com',
    keyword: '奇美',
  },
  {
    url: 'https://www.google.com',
    keyword: '野餐',
  },
  {
    url: 'https://www.google.com',
    keyword: '登山',
  },
];

type SearchBarProps = {
  className: string;
};

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

const SearchBar = ({ className = '' }: SearchBarProps) => {
  const { matches: isMobile } = useMediaQuery();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      keyword: '',
      location: '',
      category: '',
    },
  });

  const handleSearchSubmit = form.handleSubmit(async (data) => {
    const queryString = createQueryString(data);
    router.push(`/search?${queryString}`);
  });

  return (
    <Form {...form}>
      {isMobile ? (
        <SearchBarMobile
          className=""
          activityPictures={DUMMY_PICTURES}
          activityKeywords={DUMMY_KEYWORDS}
          locations={locations}
          categories={categories}
          onSearchSubmit={handleSearchSubmit}
          debugMode={debugMode}
        />
      ) : (
        <SearchBarDesktop
          className={cn('', className)}
          activityPictures={DUMMY_PICTURES}
          activityKeywords={DUMMY_KEYWORDS}
          locations={locations}
          categories={categories}
          onSearchSubmit={handleSearchSubmit}
        />
      )}
    </Form>
  );
};

export default SearchBar;
