const path = require('path');
const baseDir = path.resolve(__dirname, '../');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production',
  context: baseDir,
  entry: {
    main: './src/frontend/main.ts'
  },
  output: {
    path: baseDir+'/lib',
    filename: './frontend/[name].js',
    library: {
      type: 'commonjs'
    }
  },
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
    alias: {
      '@': baseDir+'/src/frontend',
      '~': baseDir+'/src'
    }
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { 
              "targets": {
                "chrome": "68",
              },
            }]
          ],
          plugins: ['@babel/plugin-transform-modules-commonjs', '@vue/babel-plugin-jsx']
        }
      }, {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: ['\.vue$'],
          happyPackMode: false,
          transpileOnly: true,
        }
      }]
    }, {
      test: /\.tsx$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { 
              "targets": {
                "chrome": "68",
              },
            }]
          ],
          plugins: ['@babel/plugin-transform-modules-commonjs', '@vue/babel-plugin-jsx']
        }
      },
      {
        loader: 'ts-loader',
        options: {
          appendTsxSuffixTo: ['\.vue$'],
          happyPackMode: false,
          transpileOnly: true,
        }
      }]
    }, {
      test: /\.(?:sa)ss$/,
      exclude: /node_modules/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../../',
        }
      }, {
        loader: "css-loader"
      },{
        loader: 'sass-loader',
        options: { 
          // implementation: require("sass")
          additionalData: '@import "@/styles/variables.scss"'
        }
      }]
    }, {
      test: /\.(?:sc)ss$/,
      exclude: /node_modules/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../../',
        }
      }, {
        loader: "css-loader"
      },{
        loader: 'sass-loader',
        options: { 
          // implementation: require("sass")
          additionalData: '@import "@/styles/variables.scss";'
        }
      }]
    }, {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../../',
        }
      }, {
        loader: "css-loader"
      }]
    }, {
      test: /\.(png|svg|jpg|jpeg|gif|ttf|woff)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/img/[hash][ext][query]'
      }
    }, {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
      options: {
      }
    }]
  },
  optimization: {
    minimize: false,
  },
  externals: [{
    'tslib': 'tslib',
    'reflect-metadata': 'reflect-metadata',
    '@malagu/core': '@malagu/core',
    '@malagu/vue': '@malagu/vue',
    'vue': 'vue',
    'vuex': 'vuex',
    'vue-router': 'vue-router',
    '~/common': '~/common',
    '@lccf-vue/vue-boot': '@lccf-vue/vue-boot',
    'element-plus':'element-plus',
    'element-plus/dist/index.css':'element-plus/dist/index.css',
    '@element-plus/icons-vue': '@element-plus/icons-vue'
  }, function({ context, request }, callback) {
    let fullPath = '';
    let firstChar = request.charAt(0);
    if (firstChar === '.') {
      fullPath = path.resolve(context, request).replace(baseDir, '');
      let skip = false;
      if (/services|store/.test(fullPath)) {
        skip = true;
      }
      else if (/config$/.test(fullPath)) {
        skip = true;
      }
      if (skip) {
        console.log(`[skip]: ${fullPath}`);
        return callback(null, 'commonjs '+request);
      }
    }
    if(firstChar !== '-') {
      console.log(`[include]: ${fullPath || request}`);
    }
    return callback();
  }],
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/index.css'
    })
  ]
}
