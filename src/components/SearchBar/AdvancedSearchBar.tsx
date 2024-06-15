'use client';

import { SearchParams } from '@action/activity';
import { Button } from '@components/ui/button';
import { Form } from '@components/ui/form';
import cn from '@lib/utils';
import { XSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import ActivityField from './fields/ActivityField';
import CategoryFieldMenu from './fields/CategoryFieldMenu';
import DateFieldMenu from './fields/DateFieldMenu';
import DistanceFieldMenu from './fields/DistanceFieldMenu';
import EventTypeFieldMenu from './fields/EventTypeFieldMenu';
import LocationFieldMenu from './fields/LocationFieldMenu';
import SortFieldMenu from './fields/SortFieldMenu';
import { categories, locations } from './fields/utils';

type AdvancedSearchBarProps = {
  filteredParams: Partial<SearchParams>;
};

const createQueryString = (data: {
  keyword: string;
  location: string;
  category: string;
  date: string;
  type: string;
  distance: string;
  sort: string;
}) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    params.set(key, value);
  });
  return params.toString();
};

const AdvancedSearchBar = ({ filteredParams }: AdvancedSearchBarProps) => {
  const router = useRouter();
  const form = useForm<SearchParams>({
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

  useEffect(() => {
    if (location || category || type || sort || distance || date) {
      const queryString = createQueryString({
        keyword: form.getValues('keyword'),
        location: location || '',
        category: category || '',
        type: type || '',
        distance: distance || '',
        sort: sort || '',
        date: date || '',
      });
      router.push(`/search?${queryString}`);
    }
  }, [location, category, type, distance, sort, date, form, router]);

  const handleSearchSubmit = form.handleSubmit(async (data) => {
    const queryString = createQueryString(data);
    router.push(`/search?${queryString}`);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSearchSubmit}>
        <section className="flex flex-col">
          <div
            className={cn(
              'z-20 max-w-[81rem] space-y-6 border-t border-primary bg-surface pt-6 text-primary',
              'flex gap-2'
            )}
          >
            <div className="flex grow">
              <ActivityField
                side="bottom"
                activityKeywords={[
                  {
                    url: 'https://www.google.com',
                    keyword: '露營',
                  },
                  {
                    url: 'https://www.google.com',
                    keyword: '酒精路跑',
                  },
                  {
                    url: 'https://www.google.com',
                    keyword: '奇美',
                  },
                  {
                    url: 'https://www.google.com',
                    keyword: '野餐',
                  },
                  {
                    url: 'https://www.google.com',
                    keyword: '登山',
                  },
                ]}
                activityPictures={[
                  {
                    thumbnail:
                      'https://images.unsplash.com/photo-1546484458-6904289cd4f0?q=100&w=416&h=fit&fm=webp',
                    url: '/',
                    description: '夕陽海灘派對',
                  },
                  {
                    thumbnail:
                      'https://plus.unsplash.com/premium_photo-1663099746128-34ea20ac094d?q=100&w=416&h=fit&fm=webp',
                    url: '/',
                    description: '城市探險尋寶',
                  },
                  {
                    thumbnail:
                      'https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?q=100&w=416&h=fit&fm=webp',
                    url: '/',
                    description: '極光露營體驗',
                  },
                ]}
              />
              <CategoryFieldMenu categories={categories} side="bottom" />
              <LocationFieldMenu locations={locations} side="bottom" />
              <Button
                type="submit"
                className="flex h-auto self-auto px-20 text-xl font-bold"
              >
                搜尋活動
              </Button>
            </div>
          </div>
          <div
            className={cn('h-[5.5rem]  space-y-6 bg-surface pb-6 text-primary')}
          >
            <div className={cn('flex grow border-b border-primary py-4')}>
              <div className="flex w-[8.125rem] flex-row items-center justify-center border-x border-primary px-4">
                {['活動', '團體'].map((item) => (
                  <button
                    type="button"
                    disabled={item === '團體'}
                    key={item}
                    className="h-full w-full space-y-2 border-primary "
                  >
                    <p
                      className={cn(
                        'font-bold',
                        item === '團體' ? 'text-muted-foreground' : ''
                      )}
                    >
                      {item}
                    </p>
                  </button>
                ))}
              </div>
              <DateFieldMenu dates={[]} side="bottom" />
              <EventTypeFieldMenu events={[]} side="bottom" />
              <DistanceFieldMenu distances={[]} side="bottom" />
              <section className="flex min-w-64 flex-row items-center justify-center gap-2 pl-4">
                <SortFieldMenu sorts={[]} />
                <Button className="rounded-[0.375rem] border bg-surface text-primary">
                  <XSquare />
                  清除條件
                </Button>
              </section>
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
};

export default AdvancedSearchBar;
