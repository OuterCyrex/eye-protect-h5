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
  // 匹配不到重定向会主页
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: '/Home',
  },
];

export default routes;
