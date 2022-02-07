export const ConfigContext = Symbol('ConfigContext');

export interface ConfigContext {
  data: any;
  set<T>(key: string, data: T): any;
  get<T>(key: string): T;
}
