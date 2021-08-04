import Home from '../views/home/index.vue';

export const getBasicRouter = () => [{
    path: '/',
    name: 'home',
    component: Home,
}];

export const routerConfig = (next: any) => (routes: any, routerOptions: any) => {
  let basicRoutes = getBasicRouter();
  return next(routes.slice(0).concat(basicRoutes), routerOptions);
}