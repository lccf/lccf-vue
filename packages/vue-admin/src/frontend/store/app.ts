import { Cookie as Cookies } from '@/common/utils/cookie';

export type AppState = {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean,
  },
  device: string,
  routes: any[],
  addRoutes: any[]
}
export const app = {
  namespaced: true,
  state: {
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
    TOGGLE_SIDEBAR: (state: AppState) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state: AppState, withoutAnimation: boolean) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state: AppState, device: string) => {
      state.device = device
    },
    SET_ROUTES: (state: AppState, routes: any) => {
      // state.addRoutes = routes
      // state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
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
