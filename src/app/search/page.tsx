'use client';

import SearchBarDesktop from '@components/SearchBar/SearchBarDesktop';
import { Form } from '@components/ui/form';
import {
  BotIcon,
  DumbbellIcon,
  Gamepad2Icon,
  HazeIcon,
  HeartIcon,
  PaletteIcon,
  PartyPopperIcon,
  TreesIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

interface SearchParams {
  keyword: string;
  location: string;
  category: string;
  date: string;
  distance: string;
  sort: string;
  limit: string;
  page: string;
}

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

const getSearchFilter = (params: SearchPageProps['searchParams']) => {
  const allowedParams: (keyof SearchParams)[] = [
    'keyword',
    'category',
    'location',
    'date',
    'distance',
    'sort',
    'limit',
    'page',
  ];

  return Object.keys(params).reduce<Partial<SearchParams>>((acc, key) => {
    if (allowedParams.includes(key as keyof SearchParams)) {
      const value = params[key];
      if (typeof value === 'string') {
        acc[key as keyof SearchParams] = value;
      }
    }
    return acc;
  }, {});
};

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const filteredParams = getSearchFilter(searchParams);
  const router = useRouter();
  const form = useForm<SearchParams>({
    defaultValues: {
      keyword: '',
      location: '',
      category: '',
      ...filteredParams,
    },
  });

  const handleSearchSubmit = form.handleSubmit(async (data) => {
    const queryString = createQueryString(data);
    router.replace(`/search?${queryString}`);
  });

  // TODO: Create the action to fetch result
  // const result = await getActivitiesByFilter(filteredParams);

  return (
    <>
      <section id="search">
        <Form {...form}>
          <SearchBarDesktop
            className=""
            activityPictures={[]}
            activityKeywords={[]}
            locations={[
              {
                url: '/',
                text: '北部',
              },
              {
                url: '/',
                text: '中部',
              },
              {
                url: '/',
                text: '南部',
              },
              {
                url: '/',
                text: '東部',
              },
              {
                url: '/',
                text: '離島',
              },
            ]}
            onSearchSubmit={handleSearchSubmit}
            categories={[
              {
                icon: TreesIcon,
                url: 'https://www.google.com/',
                text: '戶外踏青',
              },
              {
                icon: PartyPopperIcon,
                url: '/',
                text: '社交活動',
              },
              {
                icon: HeartIcon,
                url: '/',
                text: '興趣嗜好',
              },
              {
                icon: DumbbellIcon,
                url: '/',
                text: '運動健身',
              },
              {
                icon: HazeIcon,
                url: '/',
                text: '健康生活',
              },
              {
                icon: BotIcon,
                url: '/',
                text: '科技玩物',
              },
              {
                icon: PaletteIcon,
                url: '/',
                text: '藝術文化',
              },
              {
                icon: Gamepad2Icon,
                url: '/',
                text: '遊戲',
              },
            ]}
          />
        </Form>
      </section>
      <section id="result">
        <div>
          {/* TODO: map by result */}
          result section
        </div>
        <div>
          {/* TODO: get by result */}
          result map section
        </div>
      </section>
    </>
  );
};

export default SearchPage;
