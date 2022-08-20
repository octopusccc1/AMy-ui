const webpackConfig = require('../webpack.config');

const prodConfig = require('../webpack/webpack.prod.config')
const { merge } = require('webpack-merge')
module.exports = () => {
    return merge(webpackConfig('production'), prodConfig)
}