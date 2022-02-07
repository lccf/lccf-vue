import { APP } from '@malagu/vue';
import { VueApplication } from '../common';
import { Autowired, Component } from '@malagu/core';

import './vue-application';

@Component(APP)
export default class {
  @Autowired(VueApplication)
  vueApp: any;

  mount(el: HTMLElement) {
    this.vueApp.mount(el)
  }
}
