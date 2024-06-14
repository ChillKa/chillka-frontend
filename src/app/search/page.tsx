import { SearchParams, getActivitiesByFilter } from '@action/activity';
import AdvancedSearchBar from '@components/SearchBar/AdvancedSearchBar';

type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
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

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const filteredParams = getSearchFilter(searchParams);

  const result = await getActivitiesByFilter(filteredParams);

  return (
    <>
      <section>
        <AdvancedSearchBar filteredParams={filteredParams} />
      </section>
      <section id="result" className="flex flex-row gap-2">
        <div className="flex flex-col gap-2">
          {result.map((activity) => (
            <div key={activity.id} className="debug w-[600px]">
              <h1>{activity.name}</h1>
              <p>
                {activity.startDate}-{activity.endDate}
              </p>
            </div>
          ))}
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
