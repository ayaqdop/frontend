const fs = require('fs')
const dotenv = require('dotenv')
const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

dotenv.config()

const appDirectory = fs.realpathSync(process.cwd())
const DIST_DIR = path.resolve(appDirectory, './build')
const SRC_DIR = path.resolve(appDirectory, './src')

module.exports = {
  entry: ['react-hot-loader/patch', SRC_DIR + '/index.js'],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
      DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
      AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
      API_KEY: JSON.stringify(process.env.API_KEY),
      STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
      MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
      APP_ID: JSON.stringify(process.env.APP_ID)
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './public/index.html'
    }),
    new FaviconsWebpackPlugin('./public/dop.png')
  ]
}
