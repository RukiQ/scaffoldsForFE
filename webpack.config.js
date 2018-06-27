/*
 * @Author: Ruth
 * @Date:   2016-11-02 11:25:52
 * @Last Modified time: 2016-11-14 15:33:35
 */

'use strict';

var webpack = require('webpack');

// css 单独打包，使用该插件后就不需要配置style-loader了
// 本来是内联在最终的网页里，现在通过外联方式，可以在/dist文件夹下找到单独的css文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: './src/entry.js', // 唯一的入口文件
        vendor: ['react'] // 这里是依赖的库文件配置，和CommonsChunkPlugin配合使用可以单独打包
    },
    output: {
        path: '/dist', //打包后的文件存放的地方
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/dist/' //启动本地服务后的根目录
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel',
            // 可以单独在当前目录下配置.babelrc，也可以在这里配置
            query: {
                // presets: ['es2015', 'react']
            },
            // 排除 node_modules 下不需要转换的文件，可以加快编译
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style", "css")
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style", "css!sass")
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=819200'
        }]
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        })
    ]
};