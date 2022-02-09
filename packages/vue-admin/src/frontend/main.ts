import { Component, Autowired } from '@malagu/core';
import { VueApplicationLifecycle, VueApplicationContext } from '@lccf-vue/vue-boot';
import { mergeConfig } from './config';
import { routerConfig } from './config/router';
import { configStore } from './store/index';

import ElementPlus from 'element-plus'
import *　as ElementPlusIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css'
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
    let icons = Object.keys(ElementPlusIcons);
    for(let icon of icons) {
      app.component(`${icon.toLowerCase()}-icon`, (ElementPlusIcons as any)[icon]);
    }
    return next(app);
  }
}
