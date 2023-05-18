const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserJSPlugin = require('terser-webpack-plugin');
// eslint-disable-next-line import/extensions
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/extensions
const baseWebpackConfig = require('./webpack.config.base.js');

const { analyse, spa } = process.env;
const plugins = [new CaseSensitivePathsPlugin()];
if (analyse) {
  plugins.push(new BundleAnalyzerPlugin());
}
if (spa) {
  plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../../index.html'),
    inject: false,
  }));
}
const entryPath = path.resolve(__dirname, '../src/index.tsx');
module.exports = [
  {
    ...baseWebpackConfig,
    mode: 'production',
    entry: {
      'smart-calendar': entryPath,
      'smart-calendar.min': entryPath,
    },
    output: {
      path: path.resolve(__dirname, '../../dist'),
      filename: '[name].js',
      globalObject: 'this',
      libraryTarget: 'umd',
    },
    plugins,
    optimization: {
      minimize: true,
      minimizer: [
        new TerserJSPlugin({
          include: /\.min\.js$/,
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true,
              pure_funcs: ['console.log'],
            },
          },
        }),
      ],
    },
  },
];
