import { createStore as VueCreateStore } from 'vuex';

export const store = {
  state: {}
};

export const modules = {};

export const createStore = (store: any, modules: any, options: any) => VueCreateStore({
  ...store,
  state() {
    return store.state || {};
  },
  modules
});
