import { Component, Scope, ContainerUtil } from '@malagu/core';
export const HomeButton = Symbol("HomeButton");
import { ref, Ref } from 'vue';

const vueProxy = (params: any) => (target: any) => {
  return target;
}

export interface HomeButton {
  a: Ref<number>;
  increment: () => void;
}

@Component(HomeButton)
export class HomeButtonImpl implements HomeButton {
  a: Ref<number> = ref(0);
  b: Ref<number> = ref(999);

  increment() {
    this.a.value ++;
  }

  [Symbol.iterator]() {
    return {
      keys: ['a', 'increment'],
      current: 0,
      next() {
        if (this.current <= this.keys.length) {
          return {
            value: this.keys[this.current++],
            done: false
          }
        }
        else {
          return {
            value: '',
            done: false
          }
        }
      }
    }
  }
}

export const getVueSetup = <T>(id: any) => {
  let source: T = ContainerUtil.get<T>(id);
  let handler = {
    get: (target: any, prop: string) => {
      if (typeof target[prop] == 'function' && target[prop].bind) {
        return target[prop].bind(target);
      }
      else {
        return target[prop];
      }
    },
    ownKeys: (target: any) => {
      return ['a', 'increment'];
      // return Object.keys(target);
    }
  }
  let target = new Proxy(source, handler) as T;
  let result: any = {};
  for(let key in target) {
    result[key] = target[key];
  }
  return result as T;
}