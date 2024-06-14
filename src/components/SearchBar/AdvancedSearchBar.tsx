'use client';

import { SearchParams } from '@action/activity';
import { Button } from '@components/ui/button';
import { Form } from '@components/ui/form';
import cn from '@lib/utils';
import {
  BotIcon,
  DumbbellIcon,
  Gamepad2Icon,
  HazeIcon,
  HeartIcon,
  PaletteIcon,
  PartyPopperIcon,
  TreesIcon,
  XSquare,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import ActivityField from './fields/ActivityField';
import CategoryFieldMenu from './fields/CategoryFieldMenu';
import DateFieldMenu from './fields/DateFieldMenu';
import DistanceFieldMenu from './fields/DistanceFieldMenu';
import EventTypeFieldMenu from './fields/EventTypeFieldMenu';
import LocationFieldMenu from './fields/LocationFieldMenu';
import SortFieldMenu from './fields/SortFieldMenu';

type AdvancedSearchBarProps = {
  filteredParams: Partial<SearchParams>;
};

const createQueryString = (data: {
  keyword: string;
  location: string;
  category: string;
}) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    params.set(key, value);
  });
  return params.toString();
};

const AdvancedSearchBar = ({ filteredParams }: AdvancedSearchBarProps) => {
  const [isSearchBarMenuOpen, setIsSearchBarMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [isEventTypeMenuOpen, setIsEventTypeMenuOpen] = useState(false);
  const [isDistanceMenuOpen, setIsDistanceMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

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

  if (location || category) {
    const queryString = createQueryString({
      keyword: form.getValues('keyword'),
      location: location || '',
      category: category || '',
    });
    router.replace(`/search?${queryString}`);
  }

  const handleSearchSubmit = form.handleSubmit(async (data) => {
    const queryString = createQueryString(data);
    router.replace(`/search?${queryString}`);
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
                isSearchBarMenuOpen={isSearchBarMenuOpen}
                setIsCategoryMenuOpen={setIsCategoryMenuOpen}
                setIsLocationMenuOpen={setIsLocationMenuOpen}
                setIsSearchBarMenuOpen={setIsSearchBarMenuOpen}
              />
              <CategoryFieldMenu
                isCategoryMenuOpen={isCategoryMenuOpen}
                setIsCategoryMenuOpen={setIsCategoryMenuOpen}
                categories={[
                  {
                    icon: TreesIcon,
                    url: 'https://www.google.com/',
                    text: '戶外踏青',
                  },
                  {
                    icon: PartyPopperIcon,
                    url: '/',
                    text: '社交活動',
                  },
                  {
                    icon: HeartIcon,
                    url: '/',
                    text: '興趣嗜好',
                  },
                  {
                    icon: DumbbellIcon,
                    url: '/',
                    text: '運動健身',
                  },
                  {
                    icon: HazeIcon,
                    url: '/',
                    text: '健康生活',
                  },
                  {
                    icon: BotIcon,
                    url: '/',
                    text: '科技玩物',
                  },
                  {
                    icon: PaletteIcon,
                    url: '/',
                    text: '藝術文化',
                  },
                  {
                    icon: Gamepad2Icon,
                    url: '/',
                    text: '遊戲',
                  },
                ]}
              />
              <LocationFieldMenu
                isLocationMenuOpen={isLocationMenuOpen}
                setIsLocationMenuOpen={setIsLocationMenuOpen}
                locations={[
                  {
                    url: '/',
                    text: '北部',
                  },
                  {
                    url: '/',
                    text: '中部',
                  },
                  {
                    url: '/',
                    text: '南部',
                  },
                  {
                    url: '/',
                    text: '東部',
                  },
                  {
                    url: '/',
                    text: '離島',
                  },
                ]}
              />
              <Button
                type="submit"
                className="flex h-auto self-auto px-20 text-xl font-bold"
              >
                搜尋活動
              </Button>
            </div>
          </div>
          <div
            className={cn(
              'z-20 h-[5.5rem]  space-y-6 bg-surface pb-6 text-primary'
            )}
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
              <DateFieldMenu
                isDateMenuOpen={isDateMenuOpen}
                setIsDateMenuOpen={setIsDateMenuOpen}
                dates={[]}
              />
              <EventTypeFieldMenu
                isEventTypeMenuOpen={isEventTypeMenuOpen}
                setIsEventTypeMenuOpen={setIsEventTypeMenuOpen}
                events={[]}
              />
              <DistanceFieldMenu
                isDistanceMenuOpen={isDistanceMenuOpen}
                setIsDistanceMenuOpen={setIsDistanceMenuOpen}
                distances={[]}
              />
              <section className="flex min-w-64 flex-row items-center justify-center gap-2 pl-4">
                <SortFieldMenu
                  isSortMenuOpen={isSortMenuOpen}
                  setIsSortMenuOpen={setIsSortMenuOpen}
                  sorts={[]}
                />
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
