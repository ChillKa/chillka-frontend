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
import { z } from 'zod';

export const DUMMY_PICTURES = [
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

export const DUMMY_KEYWORDS = [
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

export const locations = [
  {
    text: '北部',
  },
  {
    text: '中部',
  },
  {
    text: '南部',
  },
  {
    text: '東部',
  },
  {
    text: '離島',
  },
];

export const categories = [
  {
    text: '戶外踏青',
    endElement: <TreesIcon className="size-6 stroke-primary" />,
  },
  {
    text: '社交活動',
    endElement: <PartyPopperIcon className="size-6 stroke-primary" />,
  },
  {
    text: '興趣嗜好',
    endElement: <HeartIcon className="size-6 stroke-primary" />,
  },
  {
    text: '運動健身',
    endElement: <DumbbellIcon className="size-6 stroke-primary" />,
  },
  {
    text: '健康生活',
    endElement: <HazeIcon className="size-6 stroke-primary" />,
  },
  {
    text: '科技玩物',
    endElement: <BotIcon className="size-6 stroke-primary" />,
  },
  {
    text: '藝術文化',
    endElement: <PaletteIcon className="size-6 stroke-primary" />,
  },
  {
    text: '遊戲',
    endElement: <Gamepad2Icon className="size-6 stroke-primary" />,
  },
];

const menuAnimationVariants = {
  open: ({ size = 3000, locationX = 0, locationY = 0 }) => ({
    clipPath: `circle(${size}px at ${locationX}px ${locationY}px)`,
    transition: {
      type: 'spring',
      stiffness: 30,
      restDelta: 2,
    },
  }),
  closed: ({ locationX = 0, locationY = 0 }) => ({
    clipPath: `circle(0px at ${locationX}px ${locationY}px)`,
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  }),
};

export const menuMobileAnimationVariants = {
  open: ({ size = 3000, locationX = 0, locationY = 800 }) => ({
    clipPath: `circle(${size >= 0 ? 1000 : size}px at ${locationX}px ${locationY >= 0 ? 800 : locationY}px)`,
    transition: {
      type: 'spring',
      stiffness: 30,
      restDelta: 2,
    },
  }),
  closed: ({ locationX = 0, locationY = 800 }) => ({
    clipPath: `circle(0px at ${locationX}px ${locationY >= 0 ? 800 : locationY}px)`,
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  }),
};

export const SearchParamsSchema = z.object({
  keyword: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  date: z.string().optional(),
  type: z.string().optional(),
  distance: z.string().optional(),
  sort: z.enum(['相關性', '日期']).default('相關性').optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;

export const createQueryString = (data: SearchParams) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });
  return params.toString();
};

export default menuAnimationVariants;
