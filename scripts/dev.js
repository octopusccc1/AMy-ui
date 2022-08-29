/* eslint import/no-extraneous-dependencies: ["off"] */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');
const reportURL = require('report-url');
const path = require('path');

const PORT = 8345;
const bundler = webpack(webpackConfig('development'));
reportURL({
    tip: '可用的内网网址',
    port: PORT,
    search: ''
});

new WebpackDevServer(bundler, {
    // contentBase: path.join(__dirname, '../src'),
    // publicPath: '/',
    // static:path.join(__dirname, '../src'),
    // hot: true,
    // stats: { colors: true },
    // open: true,
}).listen(PORT, '0.0.0.0', error => {
    // if (error) {
    //     throw error;
    // }
});
