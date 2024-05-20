import account from '@public/hamburger__account.svg';
import collectActivities from '@public/hamburger__collectActivities.svg';
import login from '@public/hamburger__login.svg';
import managementActivities from '@public/hamburger__managementActivities.svg';
import queryTickets from '@public/hamburger__queryTickets.svg';
import register from '@public/hamburger__register.svg';
import startChillka from '@public/hamburger__startCHillka.svg';
import email from '@public/header__email.svg';
import notification from '@public/header__notification.svg';

export const userList = [
  {
    name: '開始揪咖',
    icon: startChillka,
    url: '',
  },
  {
    name: '收藏活動',
    icon: collectActivities,
    url: '',
  },
  {
    name: '查詢票券',
    icon: queryTickets,
    url: '',
  },
  {
    name: '管理活動',
    icon: managementActivities,
    url: '',
  },
  {
    name: '帳號',
    icon: account,
    url: '',
  },
];

export const phoneList = [
  {
    name: '信箱',
    icon: email,
    url: '',
  },
  {
    name: '通知',
    icon: notification,
    url: '',
  },
];

export const registerAndLoginList = [
  {
    name: '註冊',
    icon: register,
    url: '',
  },
  {
    name: '登入',
    icon: login,
    url: '',
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
