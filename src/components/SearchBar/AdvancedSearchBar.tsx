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
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import ActivityField from './fields/ActivityField';
import CategoryFieldMenu from './fields/CategoryFieldMenu';
import LocationFieldMenu from './fields/LocationFieldMenu';

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
      <section
        className={cn(
          'z-20 max-w-[81rem] space-y-6 border-t border-primary bg-surface py-6 text-primary'
        )}
      >
        <div className="flex gap-2">
          <form onSubmit={handleSearchSubmit} className="flex grow">
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
          </form>
        </div>
      </section>
    </Form>
  );
};

export default AdvancedSearchBar;
