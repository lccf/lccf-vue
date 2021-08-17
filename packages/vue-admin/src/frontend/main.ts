import { Component, Autowired } from '@malagu/core';
import { VueApplicationLifecycle, VueApplicationContext } from '@lccf-vue/vue-boot';
import { mergeConfig } from './config';
import { routerConfig } from './config/router';
import { configStore } from './store/index';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/styles/index.scss';

@Component(VueApplicationLifecycle)
export class VueApplicationConfig implements VueApplicationLifecycle {
  @Autowired(VueApplicationContext)
  context: VueApplicationContext;

  beforeCreateConfig(next: any, config: any, context: any) {
    return mergeConfig(next, config, context);
  }

  beforeCreateRouter(next: any, routes: any, routerOptions: any) {
    return routerConfig(next, routes, routerOptions);
  }

  beforeCreateStore(next: any, store: any, modules: any) {
    return configStore(next, store, modules);
  }

  afterCreateApp(next: any, app: any) {
    app.use(ElementPlus);
    return next(app);
  }
}