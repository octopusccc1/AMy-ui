const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = function (mode) {
  const isProduction = mode === 'production'
  const isDevelopment = mode === 'development'
  return {
    mode,
    entry: {
      site: [resolve(__dirname, './src/app.tsx')]
    },
    output: {
      filename: isProduction
        ? 'static/js/[name].[hash:8].js'
        : 'static/js/bundle.js',
      // There are also additional JS chunk files if you use code splitting.
      // chunkFilename: isProduction
      //   ? 'static/js/[name].[hash:8].chunk.js'
      //   :  'static/js/[name].chunk.js',
      //   path: resolve(__dirname, 'build')
    },
    resolve: {
      extensions: [
        ".mjs",
        ".ts",
        ".tsx",
        ".js",
        ".css",
        ".scss",
        "sass",
        ".jsx",
        ".json",

      ],
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          // use: ["ts-loader", "eslint-loader"],
          use: [
            "cache-loader", // 缓存其后loader结果
            "babel-loader",
            "ts-loader",
            // "eslint-loader",
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx|mjs)$/,
          use: [
            'babel-loader'
          ],
          // exclude:/node_modules/
        },

        {
          test: /\.css$/,
          use: [{
            loader: 'style-loader'
          },
          isProduction && MiniCssExtractPlugin.loader
            , {
            loader: 'css-loader'
          },
          ].filter(Boolean)
        },
        {
          test: /\.less$/,
          use: [{
            loader: 'style-loader'
          },
          isProduction && MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }, {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            },
          }].filter(Boolean)
        },

        {
          test: /\.md$/,
          loader: 'raw-loader'
        },
        {
          test: /\.(jpe?g|png|gif)(\?.+)?$/,
          loader: 'file-loader'
        }
      ]
    },
    // optimization:{
    //   splitChunks: {
    //     chunks: 'all',
    //     name: false,
    //   },
    // },
    plugins: [
      // isDevelopment&& new HardSourceWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'index.html')
      }),
      isProduction &&
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    ].filter(Boolean),
    devtool: 'source-map'
  }
}