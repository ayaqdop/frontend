const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.common");

const appDirectory = fs.realpathSync(process.cwd());
const DIST_DIR = path.resolve(appDirectory, "./build");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    https: false,
    open: true,
    hot: true,
    port: 8000
  },
  plugins: [
    new webpack.DefinePlugin({
      API: JSON.stringify("https://ayaqdop.herokuapp.com")
      // API: JSON.stringify("http://localhost:5000")
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
