import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';
import store from '@/store';
import { useUserStore } from '@/store/modules/user';
import routes from './routes';

const LOGIN_PATH = '/login';
const BIND_PHONE_PATH = '/bind-phone';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore(store);
  const hasToken = Boolean(userStore.getToken);
  const redirect = typeof to.query.redirect === 'string' ? to.query.redirect : '/';

  if (to.path === LOGIN_PATH || to.path === BIND_PHONE_PATH) {
    if (hasToken) {
      next(redirect);
      return;
    }
    next();
    return;
  }

  if (!hasToken) {
    next({
      path: LOGIN_PATH,
      query: {
        redirect: to.fullPath,
      },
    });
    return;
  }

  next();
});

export default router;
