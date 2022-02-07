export const baseConfig = {
  pageUrl: {
    user: {
      login: '/login'
    }
  },
  // settings
  title: 'Vue Admin Template',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false
};

export const mergeConfig = (next: any, config: any, context: any) => {
  return next({...config, ...baseConfig}, context);
}
