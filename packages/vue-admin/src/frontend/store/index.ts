import { getFrameworkModule } from './framework';
import { user } from './user'
export const configStore = (next: any, store: any, modules: any) => {
  let state = { 
    ...store.state,
    title: 'vue admin'
  };
  let framework = getFrameworkModule();
  return next({ ...store, state }, { ...modules, framework, user } );
}
