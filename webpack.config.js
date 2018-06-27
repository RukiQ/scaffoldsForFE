var webpack = require('webpack');

module.exports = {
    entry: {
        index: [
            'webpack-dev-server/client?http://localhost:8080/',
            './src/index.js'
        ]
    },
    output: {
        path: './dist', // webpack 本地打包路径
        filename: "bundle.js",
        // 线上发布路径，和path最好保持一致，html页面引入script路径
        publicPath: '/dist/'
    },
    /*devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },*/
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
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
        }]
    },
    plugins: [
        // 暴露全局接口
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}