import SearchBar from '@components/SearchBar';

type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const getSearchFilter = (params: SearchPageProps['searchParams']) => {
  const allowedParams = [
    'keyword',
    'category',
    'location',
    'date',
    'distance',
    'sort',
    'limit',
    'page',
  ];

  return Object.keys(params).reduce(
    (acc, key) => {
      if (allowedParams.includes(key)) {
        acc[key] = params[key];
      }
      return acc;
    },
    {} as { [key: string]: string | string[] | undefined }
  );
};

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const filteredParams = getSearchFilter(searchParams);
  console.log(filteredParams);

  // TODO: Create the action to fetch result
  // const result = await getActivitiesByFilter(filteredParams);

  return (
    <>
      <section id="search">
        <SearchBar className="" />
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
