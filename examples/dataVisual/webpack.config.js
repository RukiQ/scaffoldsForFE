var webpack = require('webpack');

// css 单独打包，使用该插件后就不需要配置style-loader了
// 本来是内联在最终的网页里，现在通过外联方式，可以在/dist文件夹下找到单独的css文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // devtool: 'eval-source-map',
    entry: {
        index: './src/entry.js'
    },
    output: {
        path: './dist', // webpack 本地打包路径
        filename: "bundle.js",
        // 线上发布路径，和path最好保持一致，html页面引入script路径
        publicPath: 'http://localhost:8080/dist/'
    },
    /*devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },*/
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            // 可以单独在当前目录下配置.babelrc，也可以在这里配置
            query: {
                presets: ['es2015']
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
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    plugins: [
        new ExtractTextPlugin('main.css')
    ]
}
