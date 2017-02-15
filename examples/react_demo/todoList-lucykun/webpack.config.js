/*
 * @Author: Ruth
 * @Date:   2016-11-02 11:25:52
 * @Last Modified time: 2016-11-10 09:41:14
 */

'use strict';

var path = require('path');

module.exports = {
    entry: {
        index: [
            'webpack-dev-server/client?http://localhost:8080/',
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
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
            loader: "style!css"
        }, {
            test: /\.scss$/,
            loader: "style!css!sass"
        }]
    }
};