var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['jquery']
    },
    output: {
        path: 'dist', // webpack 本地打包路径
        filename: '[name].js',
        // 线上发布路径，和path最好保持一致，html页面引入script路径
        publicPath: 'http://localhost:7000/dist/'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    resolve: {
        extensions: ['', '.js', '.json', '.es6.js'],
        alias: {
            // 自定义路径别名
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style", "css!sass")
        }, {
            test: /\.js$/,
            loader: 'babel',
            // 可以单独在当前目录下配置.babelrc，也可以在这里配置
            query: {
                presets: ['es2015']
            },
            // 排除 node_modules 下不需要转换的文件，可以加快编译
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.tpl$/,
            loader: 'mustache'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    plugins: [
        // 暴露全局接口
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Backbone: 'backbone',
            _: 'underscore',
            bizui: 'biz-ui'
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        })
    ]
}