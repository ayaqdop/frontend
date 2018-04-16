const path = require("path");

const DIST_DIR = path.resolve(__dirname, "./static/dist");
const SRC_DIR = path.resolve(__dirname, "./static");

const config = {
  entry: SRC_DIR + "/components/index.js",
  output: {
    path: DIST_DIR,
    filename: "bundle.js",
    publicPath: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loader: "babel-loader",
      }
    ]
  }
};

module.exports = config;
