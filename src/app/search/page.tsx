import { getActivitiesByFilter } from '@action/activity';
import { SearchParams } from '@components/SearchBar/fields/utils';
import SearchClient from './search.client';

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
      switch (key) {
        case 'keyword':
        case 'category':
        case 'location':
        case 'date':
        case 'type':
        case 'distance':
        case 'limit':
        case 'page':
          if (typeof value === 'string') {
            acc[key as keyof Omit<SearchParams, 'sort'>] = value;
          }
          break;
        case 'sort':
          if (value === '相關性' || value === '日期') {
            acc[key as 'sort'] = value;
          }
          break;
        default:
          break;
      }
    }
    return acc;
  }, {});
};

type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const filteredParams = getSearchFilter(searchParams);

  const result = await getActivitiesByFilter(filteredParams);

  return (
    <section className="mx-auto flex max-w-[81rem] flex-col gap-2">
      <SearchClient result={result} />
    </section>
  );
};

export default SearchPage;
