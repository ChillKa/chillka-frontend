'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import { XSquare } from 'lucide-react';
import { FormEventHandler, MouseEventHandler } from 'react';
import ActivityField from './fields/ActivityField';
import CategoryFieldMenu from './fields/CategoryFieldMenu';
import DateFieldMenu from './fields/DateFieldMenu';
import DistanceFieldMenu from './fields/DistanceFieldMenu';
import EventTypeFieldMenu from './fields/EventTypeFieldMenu';
import LocationFieldMenu from './fields/LocationFieldMenu';
import SortFieldMenu from './fields/SortFieldMenu';
import { categories, locations } from './fields/utils';

export type AdvancedSearchBarDesktopProps = {
  onSearchSubmit?: FormEventHandler<HTMLFormElement>;
  onClearFilter?: () => void;
};

const AdvancedSearchBarDesktop = ({
  onSearchSubmit,
  onClearFilter,
}: AdvancedSearchBarDesktopProps) => {
  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    onSearchSubmit?.(e);
  };
  const handleClearFilter: MouseEventHandler<HTMLButtonElement> = () => {
    onClearFilter?.();
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
            <DateFieldMenu
              dates={[
                {
                  url: '/',
                  text: '即將開始',
                },
                {
                  url: '/',
                  text: '今天',
                },
                {
                  url: '/',
                  text: '明天',
                },
                {
                  url: '/',
                  text: '本周',
                },
                {
                  url: '/',
                  text: '下周',
                },
                {
                  url: '/',
                  text: '本周末',
                },
                {
                  url: '/',
                  text: '下一周',
                },
                {
                  url: '/',
                  text: '今天',
                },
                {
                  url: '/',
                  text: '自訂日期',
                },
              ]}
              side="bottom"
            />
            <EventTypeFieldMenu
              events={[
                {
                  url: '/',
                  text: '線上聚會',
                },
                {
                  url: '/',
                  text: '實體聚會/室內',
                },
                {
                  url: '/',
                  text: '實體聚會/室外',
                },
              ]}
              side="bottom"
            />
            <DistanceFieldMenu
              distances={[
                {
                  url: '/',
                  text: '2公里',
                },
                {
                  url: '/',
                  text: '5公里',
                },
                {
                  url: '/',
                  text: '10公里',
                },
                {
                  url: '/',
                  text: '25公里',
                },
                {
                  url: '/',
                  text: '50公里',
                },
                {
                  url: '/',
                  text: '100公里',
                },
              ]}
              side="bottom"
            />
            <section className="flex min-w-64 flex-row items-center justify-center gap-4 pl-4">
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
              />
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
