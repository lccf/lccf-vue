import { WebpackContext, ConfigurationContext } from '@malagu/cli-service';
import * as path from 'path';

export default async (context: WebpackContext) => {
  const { configurations } = context;
  const webpackConfig = ConfigurationContext.getFrontendConfiguration(
      configurations
  );
  if (webpackConfig) {
    const basePath = path.resolve(__dirname, '../');
    webpackConfig.resolve
      .alias
        .set('@', basePath+'/frontend')
        .set('~', basePath);

    let oneOfKeys = ['normal', 'normal-modules', 'vue', 'vue-modules'];
    for (let oneOfKey of oneOfKeys) {
      webpackConfig.module
      .rule('scss')
        .oneOf(oneOfKey)
          .use('sass-loader')
            .tap((options: any) => ({
              ...options,
              additionalData: '@import "@/styles/variables.scss";'
            }))
      .end().end().end()
      .rule('sass')
        .oneOf(oneOfKey)
          .use('sass-loader')
            .tap((options: any) => ({
              ...options,
              additionalData: '@import "@/styles/variables.scss"'
            }));
    }
  }
}
