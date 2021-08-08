import { Component, Autowired } from '@malagu/core';
import { VueApplicationLifecycle, VueApplicationContext } from '@lccf-vue/vue-boot';
import { mergeConfig } from './config';
import { routerConfig } from './config/router';
import { configStore } from './store/index';

import '@lccf-vue/vue-admin/lib/assets/css/index.css';

@Component(VueApplicationLifecycle)
export class VueApplicationAppConfig implements VueApplicationLifecycle {
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
}