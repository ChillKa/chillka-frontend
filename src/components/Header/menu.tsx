import {
  Bell,
  Bookmark,
  ClipboardList,
  LogIn,
  Mail,
  Ticket,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

export const userList = [
  {
    name: '開始揪咖',
    icon: <Users size={24} />,
    url: '',
  },
  {
    name: '收藏活動',
    icon: <Bookmark size={24} />,
    url: '',
  },
  {
    name: '查詢票券',
    icon: <Ticket size={24} />,
    url: '',
  },
  {
    name: '管理活動',
    icon: <ClipboardList size={24} />,
    url: '',
  },
  {
    name: '帳號',
    icon: <User size={24} />,
    url: '',
  },
];

export const phoneList = [
  {
    name: '信箱',
    icon: <Mail size={24} />,
    url: '',
  },
  {
    name: '通知',
    icon: <Bell size={24} />,
    url: '',
  },
];

export const registerAndLoginList = [
  {
    name: '註冊',
    icon: <UserPlus size={24} />,
    url: '/auth/register',
  },
  {
    name: '登入',
    icon: <LogIn size={24} />,
    url: '/auth/login',
  },
];

export const SITEMAP = [
  {
    name: '探索活動',
    url: '/explore',
  },
  {
    name: '推薦活動',
    url: '/recommended',
  },
  {
    name: '常見問題',
    url: '/faq',
  },
  {
    name: '關於我們',
    url: '/about',
  },
];
