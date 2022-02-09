import { ContainerUtil } from '@malagu/core'
import { ConfigContext } from '@lccf-vue/vue-boot'

type Settings = {
  showSettings: string,
  fixedHeader: boolean,
  sidebarLogo: boolean
}

export function 　getSettingsModule() {
  const config = ContainerUtil.get<ConfigContext>(ConfigContext);
  const defaultSettings = config.get<Settings>('settings');
  const getDefaultState = defaultSettings;
  return {
    namespaced: true,
    state: getDefaultState,
    mutations: {
      CHANGE_SETTING: (state: any, { key, value } : any) => {
        if (state.hasOwnProperty(key)) {
          state[key] = value
        }
      }
    },
    actions: {
      changeSetting({ commit }: any, data: any) {
        commit('CHANGE_SETTING', data)
      }
    }
  }
}
