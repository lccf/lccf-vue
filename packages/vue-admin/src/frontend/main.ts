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

  beforeCreateConfig(next: any) {
    return mergeConfig(next);
  }

  beforeCreateRouter(next: any) {
    return routerConfig(next);
  }

  beforeCreateStore(next: any) {
    return configStore(next);
  }

  afterCreateApp(next: any) {
    return (app: any) => {
      app.use(ElementPlus);
      return next(app);
    }
  }
}