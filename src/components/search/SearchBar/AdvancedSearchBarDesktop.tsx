'use client';

import { getRecommendActivitiesByKeywordWithDebounce } from '@action/activity';
import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import { XSquare } from 'lucide-react';
import { MouseEventHandler, useState } from 'react';
import ActivityField, {
  ActivityKeyword,
  ActivityPicture,
} from './fields/ActivityField';
import CategoryFieldMenu from './fields/CategoryFieldMenu';
import DateFieldMenu from './fields/DateFieldMenu';
import DistanceFieldMenu from './fields/DistanceFieldMenu';
import EventTypeFieldMenu from './fields/EventTypeFieldMenu';
import LocationFieldMenu from './fields/LocationFieldMenu';
import SortFieldMenu from './fields/SortFieldMenu';
import {
  SearchParams,
  categories,
  dates,
  distances,
  locations,
} from './fields/utils';
import { SearchField, useSearchProvider } from './SearchProvider';

export type AdvancedSearchBarDesktopProps = {
  onSearchSubmit?: (value: SearchParams) => void;
  onClearFilter?: (value: SearchParams) => void;
};

const AdvancedSearchBarDesktop = ({
  onSearchSubmit,
  onClearFilter,
}: AdvancedSearchBarDesktopProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<ActivityKeyword[]>([]);
  const [pictures, setPictures] = useState<ActivityPicture[]>([]);

  const { handleSubmit, reset, getValues } = useSearchProvider<SearchParams>();
  const handleSearchSubmit = handleSubmit((data) => {
    onSearchSubmit?.(data);
  });

  const handleClearFilter: MouseEventHandler<HTMLButtonElement> = () => {
    reset();

    const formData = getValues();
    onClearFilter?.(formData);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSearchSubmit}>
      <div
        id="first-col"
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
                activityKeywords={keywords}
                activityPictures={pictures}
                isLoading={isLoading}
                value={value}
                onChange={(keyword) => {
                  setIsLoading(true);
                  getRecommendActivitiesByKeywordWithDebounce(keyword)
                    .then((response) => {
                      setKeywords(response.keyword);
                      setPictures(response.pictures);
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                  onChange(keyword);
                }}
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
        id="second-col"
        className={cn(
          'max-w-[81rem] space-y-6 bg-surface text-primary',
          'flex gap-2'
        )}
      >
        <div className={cn('flex grow')}>
          <section
            id="show"
            className="flex w-[8.125rem] flex-row items-center justify-center border-b border-primary"
          >
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
          </section>

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

          <section className="flex min-w-64 flex-row items-center justify-center gap-4 border-b border-primary pl-4">
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
              <XSquare size={16} className="mr-2 mt-0.5" />
              清除條件
            </Button>
          </section>
        </div>
      </div>
    </form>
  );
};

export default AdvancedSearchBarDesktop;
