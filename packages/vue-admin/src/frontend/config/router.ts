import Layout from '@/views/public/layout/index.vue';
import Home from '@/views/home/index.vue';

export const getBasicRouter = () => [{
  name: 'home',
  path: '/',
  component: Layout,
  children: [{
    path: '',
    component: Home
  }]
}, {
  name: 'login',
  path: '/login',
  component: () => import('@/views/user/login.vue')
}, {
  name:'404',
  path: '/404',
  component: () => import('@/views/public/404.vue')
}];

export const routerConfig = (next: any) => async (routes: any, routerOptions: any) => {
  let basicRoutes = getBasicRouter();
  let router = await next(basicRoutes, routerOptions);
  return router;
}