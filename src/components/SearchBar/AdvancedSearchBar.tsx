'use client';

import { Form } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import useMediaQuery from '@hooks/use-media-query';
import { Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import AdvancedSearchBarDesktop from './AdvancedSearchBarDesktop';
import AdvancedSearchBarMobile from './AdvancedSearchBarMobile';
import {
  SearchParams,
  SearchParamsSchema,
  createQueryString,
} from './fields/utils';

type AdvancedSearchBarProps = {
  filteredParams: Partial<SearchParams>;
};

const AdvancedSearchBar = ({ filteredParams }: AdvancedSearchBarProps) => {
  const { matches: isMobile } = useMediaQuery();

  const router = useRouter();
  const form = useForm<SearchParams>({
    resolver: zodResolver(SearchParamsSchema),
    defaultValues: {
      keyword: '',
      location: '',
      category: '',
      ...filteredParams,
    },
  });
  const location = useWatch({
    control: form.control,
    name: 'location',
  });
  const category = useWatch({
    control: form.control,
    name: 'category',
  });
  const type = useWatch({
    control: form.control,
    name: 'type',
  });
  const distance = useWatch({
    control: form.control,
    name: 'distance',
  });
  const sort = useWatch({
    control: form.control,
    name: 'sort',
  });
  const date = useWatch({
    control: form.control,
    name: 'date',
  });
  const page = useWatch({
    control: form.control,
    name: 'page',
  });
  const limit = useWatch({
    control: form.control,
    name: 'limit',
  });

  useEffect(() => {
    if (
      location ||
      category ||
      type ||
      sort ||
      distance ||
      date ||
      page ||
      limit
    ) {
      const queryString = createQueryString({
        keyword: form.getValues('keyword'),
        location: location ?? '',
        category: category ?? '',
        type: type ?? '',
        distance: distance ?? '',
        sort: sort ?? '相關性',
        date: date ?? '',
        page: page ?? '',
        limit: limit ?? '',
      });
      router.push(`/search?${queryString}`);
    }
  }, [
    location,
    category,
    type,
    distance,
    sort,
    date,
    form,
    router,
    page,
    limit,
  ]);

  const handleSearchSubmit = async (data: SearchParams) => {
    const queryString = createQueryString(data);
    router.push(`/search?${queryString}`);
  };
  const handleClearFilter = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      {isMobile ? (
        <section className="borrder-primary fixed bottom-0 left-0 right-0 z-10 flex justify-between gap-2 border-t bg-surface px-3 py-4">
          <AdvancedSearchBarMobile
            onSearchSubmit={(data) => {
              handleSearchSubmit(data);
            }}
            onClearFilter={handleClearFilter}
          />
          <button
            type="button"
            aria-label="Map button"
            className="h-14 w-14 border-[1px] border-primary bg-surface p-4 font-medium text-primary"
          >
            <Map />
          </button>
        </section>
      ) : (
        <AdvancedSearchBarDesktop
          onSearchSubmit={form.handleSubmit(handleSearchSubmit)}
          onClearFilter={handleClearFilter}
        />
      )}
    </Form>
  );
};

export default AdvancedSearchBar;
