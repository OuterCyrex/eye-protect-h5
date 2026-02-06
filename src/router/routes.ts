import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'common.tabbar.home',
          keepAlive: true,
        },
      },
      {
        path: 'appoint',
        component: () => import('@/views/appoint/index.vue'),
        meta: {
          title: 'common.tabbar.appoint',
          keepAlive: true,
        },
      },
      {
        name: 'notice',
        path: '/notice',
        component: () => import('@/views/notice/index.vue'),
        meta: {
          title: 'common.tabbar.notice',
          border: false,
        },
      },
      {
        path: 'account',
        component: () => import('@/views/account/index.vue'),
        meta: {
          title: 'common.tabbar.account',
          keepAlive: true,
        },
      },
      {
        path: 'home/achieve',
        component: () => import('@/views/home/achieve.vue'),
        meta: {
          title: 'common.home.achieve',
          keepAlive: true,
        },
      },
      {
        path: 'home/achieve/detail',
        component: () => import('@/views/home/achieveDetail.vue'),
        meta: {
          title: 'common.home.achieveDetail',
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/Home',
  },
];

export default routes;
