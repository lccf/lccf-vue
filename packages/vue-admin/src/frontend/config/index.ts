import settings from "./_settings";

export const baseConfig = {
  settings,
  pageUrl: {
    user: {
      login: '/login'
    }
  }
};

export const mergeConfig = (next: any, config: any, context: any) => {
  return next({...config, ...baseConfig}, context);
}
