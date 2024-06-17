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
    icon: TreesIcon,
    text: '戶外踏青',
  },
  {
    icon: PartyPopperIcon,
    text: '社交活動',
  },
  {
    icon: HeartIcon,
    text: '興趣嗜好',
  },
  {
    icon: DumbbellIcon,
    text: '運動健身',
  },
  {
    icon: HazeIcon,
    text: '健康生活',
  },
  {
    icon: BotIcon,
    text: '科技玩物',
  },
  {
    icon: PaletteIcon,
    text: '藝術文化',
  },
  {
    icon: Gamepad2Icon,
    text: '遊戲',
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

export const createQueryString = (data: {
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
    if (value) {
      params.set(key, value);
    }
  });
  return params.toString();
};

export default menuAnimationVariants;
