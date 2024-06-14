'use client';

import { SearchParams } from '@action/activity';
import { Form } from '@components/ui/form';
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
import { useForm, useWatch } from 'react-hook-form';
import SearchBarDesktop from './SearchBarDesktop';

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
      <SearchBarDesktop
        className=""
        activityPictures={[]}
        activityKeywords={[]}
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
        onSearchSubmit={handleSearchSubmit}
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
    </Form>
  );
};

export default AdvancedSearchBar;
