export const defaultConfig = {};

export const createConfig = (config: any, context: any) => {
  context.data = config;
  return config;
}