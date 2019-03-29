const merge = require("webpack-merge");
const baseConfig = require("./webpack.common");
const webpack = require("webpack");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API: JSON.stringify("https://ayaqdop-backend.herokuapp.com")
    })
  ]
});
