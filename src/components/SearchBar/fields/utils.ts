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

export const categories = [
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

export default menuAnimationVariants;
