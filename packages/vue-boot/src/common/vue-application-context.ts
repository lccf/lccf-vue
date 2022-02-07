import { Router } from "vue-router";
import { Store } from "vuex";
import { App } from 'vue';

export const VueApplicationContext = Symbol('VueApplicationContext');

export interface VueApplicationContext {
  data: {[key: string]: any};
  config: any;
  store: Store<any>;
  router: Router;
  app: App;
}
