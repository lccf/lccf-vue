import { Component } from '@malagu/core';
import { ConfigContext } from '../../common';

@Component(ConfigContext)
export class ConfigContextImpl implements ConfigContext {
  data: any = {};

  isSimpleKey(key: string) {
    return key.match(/\./) === null;
  }

  set(key: string, value: any) {
    if (this.isSimpleKey(key)) {
      return this.data[key] = value;
    }
    else {
      let keys = key.split('.');
      let temp = this.data;
      for(let i=0; i<keys.length; i++) {
        let keyItem = keys[i];
        if (Object.hasOwnProperty.call(temp, keyItem)) {
          temp = temp[keyItem];
        }
        else {
          temp[keyItem] = {}
        }
      }
      let lastKey = keys[keys.length - 1];
      temp[lastKey] = value;
    }
  }

  get<T>(key: string): (T|any) {
    if (this.isSimpleKey(key)) {
      return this.data[key] as T;
    }
    else {
      let keys = key.split('.');
      let temp = this.data;
      for(let keyItem of keys) {
        if ( Object.hasOwnProperty.call(temp, keyItem) ) {
          temp = temp[keyItem];
        }
        else {
          return;
        }
      }
      return temp as T;
    }
  }
}