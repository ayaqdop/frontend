const path = require('path');
const fs = require('fs');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.common');
const webpack = require('webpack');

const appDirectory = fs.realpathSync(process.cwd());
const DIST_DIR = path.resolve(appDirectory, './build');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    https: true,
    open: true,
    hot: true,
    port: 8000
  },
  plugins: [
    new webpack.DefinePlugin({
      API: JSON.stringify('https://localhost:44300')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
