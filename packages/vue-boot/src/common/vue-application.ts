export const VueApplication = Symbol('VueApplication');

export interface VueApplication {
  mount(rootContainer: HTMLElement | string): void;
}

export const VueApplicationLifecycle = Symbol('VueApplicationLifecycle');

export interface VueApplicationLifecycle {
  beforeCreateApp?: (next: Function) => (component: any, options: any) => any;
  afterCreateApp?: (next: Function) => (appContext: any) => any;

  beforeCreateRouter?: (next: Function) => (routes: any, options: any) => any;
  afterCreateRouter?: (next: Function) => (storeContext: any) => any;

  beforeCreateStore?: (next: Function) => (stores: any, modules: any) => any;
  afterCreateStore?: (next: Function) => (storeContext: any) => any;
}