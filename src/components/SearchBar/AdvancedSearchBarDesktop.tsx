'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import { XSquare } from 'lucide-react';
import { MouseEventHandler } from 'react';
import { SearchField, useSearch } from './SearchProvider';
import ActivityField from './fields/ActivityField';
import CategoryFieldMenu from './fields/CategoryFieldMenu';
import DateFieldMenu from './fields/DateFieldMenu';
import DistanceFieldMenu from './fields/DistanceFieldMenu';
import EventTypeFieldMenu from './fields/EventTypeFieldMenu';
import LocationFieldMenu from './fields/LocationFieldMenu';
import SortFieldMenu from './fields/SortFieldMenu';
import {
  DUMMY_KEYWORDS,
  DUMMY_PICTURES,
  SearchParams,
  categories,
  dates,
  distances,
  locations,
} from './fields/utils';

export type AdvancedSearchBarDesktopProps = {
  onSearchSubmit?: (value: SearchParams) => void;
  onClearFilter?: (value: SearchParams) => void;
};

const AdvancedSearchBarDesktop = ({
  onSearchSubmit,
  onClearFilter,
}: AdvancedSearchBarDesktopProps) => {
  const { handleSubmit, reset, getValues } = useSearch<SearchParams>();
  const handleSearchSubmit = handleSubmit((data) => {
    onSearchSubmit?.(data);
  });

  const handleClearFilter: MouseEventHandler<HTMLButtonElement> = () => {
    reset();

    const formData = getValues();
    onClearFilter?.(formData);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <section className="flex flex-col">
        <div
          className={cn(
            'z-20 max-w-[81rem] space-y-6 border-t border-primary bg-surface pt-6 text-primary',
            'flex gap-2'
          )}
        >
          <div className="flex grow">
            <SearchField name="keyword" className="grow">
              {({ value, onChange }) => (
                <ActivityField
                  side="bottom"
                  activityKeywords={DUMMY_KEYWORDS}
                  activityPictures={DUMMY_PICTURES}
                  value={value}
                  onChange={onChange}
                />
              )}
            </SearchField>

            <SearchField name="category" className="min-w-64">
              {({ value, onChange }) => (
                <CategoryFieldMenu
                  categories={categories}
                  side="bottom"
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                    handleSearchSubmit();
                  }}
                />
              )}
            </SearchField>
            <SearchField name="location" className="min-w-64">
              {({ value, onChange }) => (
                <LocationFieldMenu
                  locations={locations}
                  side="bottom"
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                    handleSearchSubmit();
                  }}
                />
              )}
            </SearchField>
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
          <div className={cn('flex grow border-b border-primary')}>
            <div className="flex w-[8.125rem] flex-row items-center justify-center">
              <div className="flex h-full w-full justify-between gap-2 border-primary py-4">
                {[
                  {
                    key: 1,
                    name: '活動',
                  },
                  {
                    key: 2,
                    name: '團體',
                  },
                ].map((item) => (
                  <button
                    type="button"
                    disabled={item.name === '團體'}
                    key={item.key}
                    className={cn('h-full w-full space-y-2 border-primary', {
                      'border-l pl-2': item.key === 1,
                      'border-r pr-2': item.key === 2,
                    })}
                  >
                    <p
                      className={cn(
                        'font-bold',
                        item.name === '團體' ? 'text-muted-foreground' : ''
                      )}
                    >
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <SearchField name="date" className="min-w-64">
              {({ value, onChange }) => (
                <DateFieldMenu
                  dates={dates}
                  side="bottom"
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                    handleSearchSubmit();
                  }}
                />
              )}
            </SearchField>

            <SearchField name="type" className="min-w-64">
              {({ value, onChange }) => (
                <EventTypeFieldMenu
                  events={[
                    {
                      text: '線上',
                    },
                    {
                      text: '線下',
                    },
                  ]}
                  side="bottom"
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                    handleSearchSubmit();
                  }}
                />
              )}
            </SearchField>

            <SearchField name="distance">
              {({ value, onChange }) => (
                <DistanceFieldMenu
                  distances={distances}
                  side="bottom"
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                    handleSearchSubmit();
                  }}
                />
              )}
            </SearchField>

            <section className="flex min-w-64 flex-row items-center justify-center gap-4 pl-4">
              <SearchField name="sort">
                {({ value, onChange }) => (
                  <SortFieldMenu
                    sorts={[
                      {
                        url: '/',
                        text: '日期',
                      },
                      {
                        url: '/',
                        text: '相關性',
                      },
                    ]}
                    value={value}
                    onChange={(val) => {
                      onChange(val);
                      handleSearchSubmit();
                    }}
                  />
                )}
              </SearchField>

              <Button
                onClick={handleClearFilter}
                className={cn(
                  'w-[11.5rem] rounded-[0.375rem] border bg-surface text-primary',
                  'hover:bg-primary hover:text-white'
                )}
              >
                <XSquare />
                清除條件
              </Button>
            </section>
          </div>
        </div>
      </section>
    </form>
  );
};

export default AdvancedSearchBarDesktop;
