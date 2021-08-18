export class Cookie {
  static _data: any = {}

  static set(key: string, value: any) {
    return this._data[key] = value;
  }

  static get(key: string) {
    return this._data[key];
  }
}