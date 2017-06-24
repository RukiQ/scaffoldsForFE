var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:9000/', // 资源服务器地址
            './src/main.js'
        ]
    },
    output: {
        path: './dist', // webpack 本地打包路径
        filename: "bundle.js",
        // 线上发布路径，和path最好保持一致，html页面引入script路径
        publicPath: '/dist/'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/, 
                loader: 'style-loader!css-loader!sass-loader'
            },
            { 
                test: /\.js$/,
                loader: 'babel',
                // 可以单独在当前目录下配置.babelrc，也可以在这里配置
                query: {
                  presets: ['es2015']
                },
                // 排除 node_modules 下不需要转换的文件，可以加快编译
                exclude: /node_modules/
            },
            { 
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192' 
            },
            {
                test: /\.tpl$/,
                loader: 'mustache'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin('[name].css')
    ]
}