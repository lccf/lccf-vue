import Home from '../views/home/index.vue';

export const getBasicRouter = () => [{
    path: '/',
    component: Home,
}];

export const routerConfig = (next: any) => async (routes: any, routerOptions: any) => {
  let basicRoutes = getBasicRouter();
  let router = await next(routes.slice(0).concat(basicRoutes), routerOptions);
  return router;
}