const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, "./build");
const SRC_DIR = path.resolve(__dirname, "./static");

const config = {
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
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
    new HtmlWebpackPlugin({
        hash: true,
        filename: "index.html",
        template: "./templates/index.html"
    })
  ]
};

module.exports = config;
