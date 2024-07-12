import { getActivitiesWithCollectionStatus } from '@action/activity';
import WithErrorBoundaryAndSuspense from '@components/hoc/WithErrorBoundaryAndSuspense';
import AdvancedSearchBar from '@components/search/SearchBar/AdvancedSearchBar';
import SearchProvider from '@components/search/SearchBar/SearchProvider';
import SearchViewProvider from '@components/search/SearchBar/SearchViewProvider';
import { SearchParams } from '@components/search/SearchBar/fields/utils';
import { Skeleton } from '@components/ui/skeleton';
import ResultItemsSection from './utils/ResultItemsSection';
import ResultMapSection from './utils/ResultMapSection';

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
  const result = await getActivitiesWithCollectionStatus(filteredParams);

  const pageParam = searchParams.page;
  const currentPage =
    typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  const totalPage = Math.ceil(result.total / 5);

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
          <AdvancedSearchBar currentPage={currentPage} totalPage={totalPage}>
            <section className="flex w-full flex-row gap-6 px-3 xl:px-0">
              <WithErrorBoundaryAndSuspense
                loadingFallback={
                  <div className="h-[19.125rem] w-full">
                    <Skeleton className="w-full xl:max-w-[19.125rem]" />
                    <div className="flex flex-col">
                      <Skeleton />
                      <Skeleton />
                    </div>
                  </div>
                }
              >
                <ResultItemsSection results={result} />
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
                <ResultMapSection activities={result.activities} />
              </WithErrorBoundaryAndSuspense>
            </section>
          </AdvancedSearchBar>
        </SearchViewProvider>
      </SearchProvider>
    </section>
  );
};

export default SearchPage;
