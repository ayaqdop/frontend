var path = require("path");

var DIST_DIR = path.resolve(__dirname, "./static/dist");
var SRC_DIR = path.resolve(__dirname, "./static/components");

var config = {
    entry: SRC_DIR + "/index.js",
    output: {
        path: DIST_DIR,
        filename: "bundle.js",
        publicPath: DIST_DIR
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /node_modules/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["env", "react"]
                }
            }
        ]
    }
};

module.exports = config;
