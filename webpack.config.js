const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");

const DIST_DIR = path.resolve(__dirname, "./build");
const SRC_DIR = path.resolve(__dirname, "./static");

const config = {
  mode: "development",
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    hot: true,
    port: 8000
  },
  entry: SRC_DIR + "/components/index.js",
  output: {
    path: DIST_DIR,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new HtmlWebpackPlugin({
        hash: true,
        filename: "index.html",
        template: "./public/index.html"
    }),
    new FaviconsWebpackPlugin("./public/dop.png"),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
