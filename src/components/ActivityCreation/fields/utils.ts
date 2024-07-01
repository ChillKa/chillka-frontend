import { CircleCheckBigIcon, CircleDashedIcon } from 'lucide-react';

export const categories = [
  '戶外踏青',
  '社交活動',
  '興趣嗜好',
  '運動健身',
  '健康生活',
  '科技玩物',
  '藝術文化',
  '遊戲',
];

export const locations = ['北部', '中部', '南部', '東部', '離島'];

export const FORM_LIST_DATA = [
  {
    Icon: CircleCheckBigIcon,
    text: '封面與縮圖',
  },
  {
    Icon: CircleDashedIcon,
    text: '基本資料',
  },
  {
    Icon: CircleDashedIcon,
    text: '形式與地點',
  },
  {
    Icon: CircleDashedIcon,
    text: '摘要及說明',
  },
  {
    Icon: CircleDashedIcon,
    text: '進階設定',
  },
];

export const sectionIds = {
  organizer: 'organizer',
  activity: 'activity',
  tickets: 'tickets',
};

export const COVERS_MAX_SIZE = 5;
