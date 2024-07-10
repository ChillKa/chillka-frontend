import { getActivitiesByFilter, getFavoriteActivities } from '@action/activity';
import { isLoggedIn } from '@action/auth';
import { SearchParams } from '@components/search/SearchBar/fields/utils';
import SearchClient from './utils/search.client';

export const runtime = 'edge';

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

const getSearchFilter = (
  params: Record<string, string | string[] | undefined>
): Partial<SearchParams> => {
  const isValidEntry = (
    entry: [string, string | string[] | undefined]
  ): entry is [keyof SearchParams, string] => {
    const [key, value] = entry;
    return (
      allowedParams.includes(key as keyof SearchParams) &&
      typeof value === 'string' &&
      (key !== 'sort' || ['相關性', '日期'].includes(value))
    );
  };

  const validEntries = Object.entries(params).filter(isValidEntry);

  return Object.fromEntries(validEntries) as Partial<SearchParams>;
};

type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const filteredParams = getSearchFilter(searchParams);

  const [loggedIn, result] = await Promise.all([
    isLoggedIn(),
    getActivitiesByFilter(filteredParams),
  ]);

  let { activities = [] } = result;

  if (loggedIn) {
    const favoriteActivities = await getFavoriteActivities();
    const favoriteActivityIds = new Set(
      favoriteActivities.activities.map((activity) => activity._id)
    );

    activities = activities.map((activity) => ({
      ...activity,
      isCollected: favoriteActivityIds.has(activity._id),
    }));
  } else {
    activities = activities.map((activity) => ({
      ...activity,
      isCollected: false,
    }));
  }

  return (
    <section className="mx-auto flex max-w-[81rem] flex-col gap-2">
      <SearchClient
        result={{
          ...result,
          activities,
        }}
        initialSearchParams={filteredParams}
      />
    </section>
  );
};

export default SearchPage;
