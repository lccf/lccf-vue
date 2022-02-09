import { createRouter as VueCreateRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/home/index';

export const routes = [
  { path: '/', component: Home },
];

export const routerOptions = {
  history: createWebHashHistory()
};

export const createRouter = (router: any[], options: any) => VueCreateRouter({
  routes: router,
  ...options,
});
