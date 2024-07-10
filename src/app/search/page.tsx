import { getActivitiesByFilter, getFavoriteActivities } from '@action/activity';
import { isLoggedIn } from '@action/auth';
import { SearchParams } from '@components/search/SearchBar/fields/utils';
import SearchClient from './utils/search.client';

export const runtime = 'edge';

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

  const loggedIn = await isLoggedIn();

  const result = await getActivitiesByFilter(filteredParams);
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
      />
    </section>
  );
};

export default SearchPage;
