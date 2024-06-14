import { SearchParams, getActivitiesByFilter } from '@action/activity';
import AdvancedSearchBar from '@components/SearchBar/AdvancedSearchBar';
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
      if (typeof value === 'string') {
        acc[key as keyof SearchParams] = value;
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
        <div key={activity.id} className="debug w-[600px]">
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
    <>
      <section>
        <AdvancedSearchBar filteredParams={filteredParams} />
      </section>
      <section id="result" className="flex flex-row gap-2">
        <div className="flex w-[70%] flex-col gap-2">
          <Suspense fallback={<div>Loading...</div>}>
            <ActivitiesList filteredParams={filteredParams} />
          </Suspense>
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
