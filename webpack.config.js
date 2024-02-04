const path = require('path');
const EncodingPlugin = require('webpack-encoding-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './app/index.js',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.css$/, use: ['css-loader', 'style-loader'] }
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new EncodingPlugin({
            encoding: 'cp-1251'
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['ru'],
        })
    ],
    devtool: this.mode ? 'eval-source-map' : 'cheap-source-map'
}
