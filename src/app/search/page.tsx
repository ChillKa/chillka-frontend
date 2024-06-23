import { getActivitiesByFilter } from '@action/activity';
import AdvancedSearchBar from '@components/SearchBar/AdvancedSearchBar';
import { SearchParams } from '@components/SearchBar/fields/utils';
import SearchContentSection from '@components/SearchContentSection';
import { Suspense } from 'react';

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

type ActivitiesListProps = { filteredParams: Partial<SearchParams> };
const ActivitiesList = async ({ filteredParams }: ActivitiesListProps) => {
  const result = await getActivitiesByFilter(filteredParams);

  return (
    <>
      {result.map((activity) => (
        <div key={activity.id} className="debug w-full">
          <h1>{activity.name}</h1>
          <p>
            {activity.startDate}-{activity.endDate}
          </p>
        </div>
      ))}
    </>
  );
};

type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const filteredParams = getSearchFilter(searchParams);

  return (
    <section className="mx-auto flex max-w-[81rem] flex-col gap-2">
      <AdvancedSearchBar filteredParams={filteredParams} />

      <SearchContentSection
        results={
          <Suspense fallback={<div className="w-full">Loading...</div>}>
            <ActivitiesList filteredParams={filteredParams} />
          </Suspense>
        }
      />
    </section>
  );
};

export default SearchPage;
