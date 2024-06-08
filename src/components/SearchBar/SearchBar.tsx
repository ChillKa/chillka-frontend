/*
- [x] add a hook for mobile verstion detection
- [x] add modal component from shadcn
- [x] built-up mobile version
  - [x] modal title
  - [x] modal content
- [x] feature: add framer motion
  - [x] add animation on menu items
- [x] mobile:
  - [x] add animation
  - [x] modify menu animation
  - [x] set hover effect propperly
- [] desktop

*/

'use client';

import useMediaQuery from '@hooks/use-media-query';
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
import SearchBarDesktop from './SearchBarDesktop';
import SearchBarMobile from './SearchBarMobile';

//
const debugMode = false;

const DUMMY_PICTURES = [
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
];

const DUMMY_KEYWORDS = [
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
];

const DUMMY_LOCATIONS = [
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
];

// TODO: url would be setting up for query activities type
const DUMMY_CATEGORIES = [
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
];

type SearchBarProps = {
  className: string;
};

const SearchBar = ({ className = '' }: SearchBarProps) => {
  const { matches: isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <SearchBarMobile
        className=""
        activityPictures={DUMMY_PICTURES}
        activityKeywords={DUMMY_KEYWORDS}
        locations={DUMMY_LOCATIONS}
        categories={DUMMY_CATEGORIES}
        debugMode={debugMode}
      />
    );
  }

  return (
    <SearchBarDesktop
      className={cn('', className)}
      activityPictures={DUMMY_PICTURES}
      activityKeywords={DUMMY_KEYWORDS}
      locations={DUMMY_LOCATIONS}
      categories={DUMMY_CATEGORIES}
    />
  );
};

export default SearchBar;