import { ConfigContext } from '@lccf-vue/vue-boot/lib/common';
import { ContainerUtil } from '@malagu/core';
import { Cookie as Cookies } from '@/common/utils/cookie';
export type FrameworkState = {
  showSettings: string,
  fixedHeader: boolean,
  sidebarLogo: boolean,
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean,
  },
  device: string,
  routes: any[],
  addRoutes: any[]
}
const framework = {
  namespaced: true,
  state: {
    // settings
    showSettings: '',
    fixedHeader: false,
    sidebarLogo: false,
    // app
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    // permission
    routes: [],
    addRoutes: []
  },
  mutations: {
    CHANGE_SETTING: (state: any, { key, value } : any) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    },
    TOGGLE_SIDEBAR: (state: FrameworkState) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state: FrameworkState, withoutAnimation: boolean) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state: FrameworkState, device: string) => {
      state.device = device
    },
    SET_ROUTES: (state: FrameworkState, routes: any) => {
      // state.addRoutes = routes
      // state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    changeSetting({ commit }: any, data: any) {
      commit('CHANGE_SETTING', data)
    },
    toggleSideBar({ commit }: any) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }: any, { withoutAnimation }: any) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }: any, device: string) {
      commit('TOGGLE_DEVICE', device)
    },
    generateRoutes({ commit }: any, roles: string) {
      
    }
  }
}

export const getFrameworkModule = () => {
  const config = ContainerUtil.get<ConfigContext>(ConfigContext);
  let showSettings = config.get<string>('showSettings');
  let fixedHeader = config.get<boolean>('fixedHeader');
  let sidebarLogo = config.get<boolean>('sidebarLogo');
  framework.state = {
    ...framework.state,
    showSettings,
    fixedHeader,
    sidebarLogo
  }
  return framework;
}