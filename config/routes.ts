import type { MenuDataItem } from '@ant-design/pro-layout';

const routes: MenuDataItem[] = [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './welcome',
  },
  {
    path: '/auth/login',
    name: 'login',
    icon: 'smile',
    component: './auth/login',
    layout: false,
  },
  {
    path: '*',
    layout: false,
    hideInMenu: true,
    component: './404',
  },
];

export default routes;
