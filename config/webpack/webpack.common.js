const path = require("path");
const fs = require("fs");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const DIST_DIR = path.resolve(appDirectory, "./build");
const SRC_DIR = path.resolve(appDirectory, "./src");

module.exports = {
  entry: ["react-hot-loader/patch", SRC_DIR + "/index.js"],
  output: {
    path: DIST_DIR,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: "index.html",
      template: "./public/index.html"
    }),
    new FaviconsWebpackPlugin("./public/dop.png")
  ]
};
