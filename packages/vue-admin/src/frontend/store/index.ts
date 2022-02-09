import { app } from './app'
import { user } from './user'
import {　getSettingsModule } from './settings'
import { getters } from './getter';

export const configStore = (next: any, store: any, modules: any, options: any) => {
  let state = { 
    ...store.state,
    title: 'vue admin'
  }
  let settings = getSettingsModule();
  return next(
    { ...store, state },
    { ...modules, app, user, settings },
    { ...options, getters }
  )
}
