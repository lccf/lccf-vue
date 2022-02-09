import App from './app';
import { createApp } from 'vue';
import { Autowired, Component, Optional } from "@malagu/core";
import { defaultConfig, createConfig } from './config';
import { routes, routerOptions, createRouter  } from './config/router';
import { store, modules, createStore } from './store';
import { VueApplication, VueApplicationLifecycle, VueApplicationContext, ConfigContext, toPromise } from '../common';
import './config/config-context';

@Component(VueApplicationContext)
export class VueApplicationContextImpl implements VueApplicationContext {
  data: {[key: string]: any} = {};

  private _config: any;
  get config() {
    return this._config;
  }
  set config(config: any) {
    this._config = config;
  }

  private _store: any;
  get store() {
    return this._store;
  }
  set store(store: any) {
    this._store = store;
  }

  private _router: any;
  get router() {
    return this._router;
  }
  set router(router: any) {
    this._router = router;
  }

  private _app: any;
  get app() {
    return this._app;
  }
  set app(app: any) {
    this._app = app;
  }
}

@Component(VueApplication)
export class VueApplicationImpl implements VueApplication {
  @Optional()
  @Autowired(VueApplicationLifecycle)
  lifecycles: any[];

  @Optional()
  @Autowired(VueApplicationContext)
  context: VueApplicationContext;

  @Autowired(ConfigContext)
  config: ConfigContext;

  compose(next: Function, fn: Function, ctx: any = null) {
    return (...args: any[]) =>  fn.apply(ctx, [next].concat(args));
  }

  getLifecycle(key: string, init: Function = toPromise((t: any) => t)): Function {
    let lifecycles = this.lifecycles;
    let result = init;
    for(let i=lifecycles.length; i>0; i--) {
      let lifecycle = lifecycles[i-1];
      if (lifecycle[key])
        result = this.compose(result, lifecycle[key], lifecycle);
    }
    return result;
  }

  createConfig() {
    let beforeCallback = this.getLifecycle('beforeCreateConfig', toPromise(createConfig));
    let afterCallback: Function = this.getLifecycle('afterCreateConfig');
    return beforeCallback(defaultConfig, this.config).then(afterCallback);
  }

  createStore() {
    let beforeCallback = this.getLifecycle('beforeCreateStore', toPromise(createStore));
    let afterCallback = this.getLifecycle('afterCreateStore');
    return beforeCallback(store, modules, {}).then(afterCallback);
  }

  createRouter() {
    let beforeCallback = this.getLifecycle('beforeCreateRouter', toPromise(createRouter));
    let afterCallback: Function = this.getLifecycle('afterCreateRouter');
    return beforeCallback(routes, routerOptions).then(afterCallback);
  }

  createApp() {
    let beforeCallback = this.getLifecycle('beforeCreateApp', toPromise(createApp));
    let afterCallback = this.getLifecycle('afterCreateApp');
    return this.createConfig()
      .then((config: any) => {
        this.context.config = config;
        return this.createStore();
      })
      .then((store: any) => {
        this.context.store = store;
        return this.createRouter();
      })
      .then((router: any) => {
        this.context.router = router;
        return beforeCallback(App, {});
      })
      .then((app: any) => {
        app.use(this.context.store)
          .use(this.context.router);
        return this.context.app = app;
      })
      .then(afterCallback);
  }

  mount(el: HTMLElement) {
    if (!this.context.app) {
      return this.createApp().then((app: any) => {
        app.mount(el);
      });
    }
    this.context.app.mount(el);
  }
}
