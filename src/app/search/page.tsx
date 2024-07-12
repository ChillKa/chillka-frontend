import { getActivitiesByFilter, getFavoriteActivities } from '@action/activity';
import { isLoggedIn } from '@action/auth';
import WithErrorBoundaryAndSuspense from '@components/hoc/WithErrorBoundaryAndSuspense';
import AdvancedSearchBar from '@components/search/SearchBar/AdvancedSearchBar';
import SearchProvider from '@components/search/SearchBar/SearchProvider';
import SearchViewProvider from '@components/search/SearchBar/SearchViewProvider';
import { SearchParams } from '@components/search/SearchBar/fields/utils';
import { Skeleton } from '@components/ui/skeleton';
import { Suspense } from 'react';
import { SkelotonItems } from './utils/ResultItemsSection';
import ResultMapSection from './utils/ResultMapSection';
import ResultsPagination from './utils/ResultsPagination';
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
  const result = Object.fromEntries(validEntries) as Partial<SearchParams>;

  if (!result.limit) result.limit = '5';

  return result;
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

  const pageParam = searchParams.page;
  const currentPage =
    typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  const totalPage = Math.ceil(result.total / 5);

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
      <SearchProvider<SearchParams>
        defaultValues={{
          keyword: '',
          location: '',
          category: '',
          date: '',
          type: '',
          distance: '',
          page: '1',
          limit: '5',
          sort: '相關性',
          ...filteredParams,
        }}
      >
        <SearchViewProvider>
          <Suspense fallback={<div>loading...</div>}>
            <AdvancedSearchBar />
          </Suspense>

          <section id="result-block" className="flex w-full flex-col gap-6">
            <section className="flex w-full flex-row gap-6 px-3 xl:px-0">
              <WithErrorBoundaryAndSuspense
                loadingFallback={<SkelotonItems isMobile={false} />}
              >
                <SearchClient
                  result={{
                    ...result,
                    activities,
                  }}
                />
              </WithErrorBoundaryAndSuspense>

              <WithErrorBoundaryAndSuspense
                loadingFallback={
                  <div className="h-[400px] w-full space-y-2">
                    <Skeleton className="h-full w-full rounded-lg" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-4 w-[60px]" />
                    </div>
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                }
              >
                <ResultMapSection activities={activities} />
              </WithErrorBoundaryAndSuspense>
            </section>

            <ResultsPagination
              currentPage={currentPage}
              totalPage={totalPage}
            />
          </section>
        </SearchViewProvider>
      </SearchProvider>
    </section>
  );
};

export default SearchPage;
