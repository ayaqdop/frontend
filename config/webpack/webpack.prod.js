const merge = require("webpack-merge");
const baseConfig = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      API: JSON.stringify("https://ayaqdop.herokuapp.com")
    })
  ]
});
