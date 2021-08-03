export * from './vue-application';
export * from './vue-application-context';
export * from './config-context';
export const toPromise = (cb: Function) => (...args: any[]) => Promise.resolve( cb.apply(null, args) );