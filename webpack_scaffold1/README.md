# webpack_scaffold1
a scaffold with webpack

## 运行命令

1. 安装依赖：`npm install`
2. 运行项目：`npm start`

## 大致流程

1. `npm init`：新建 `package.json`

3. 将需要的依赖模块加入 `dependencies`（生产环境） 和 `devDependencies`（开发环境，在本地打包所需的模块）

3. `npm install`：自动安装上述添加好的模块

4. 配置 `webpack.config.js`

5. 配置 `package.json` 的 `script`：自定义命令

> 如果不在 `package.json` 里面配置，可以通过手动安装模块（☟），输入命令，执行后会自动添加到 `dependencies` 或 `devDependencies` 中。

## 文件目录

assets/

- css/
    - style.scss

src/

- content.js
- index.js

index.html

package.json

webpack.config.js

## package.json 文件预览

    {
      "name": "webpack_scaffold",
      "version": "1.0.0",
      "description": "a scaffold with webpack",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack-dev-server --port 8080 --hot --inline --progress --colors --devtool eval",
        "build": "webpack --display-error-details",
        "watch": "webpack --progress --colors --watch"
      },
      "author": "Ruth",
      "license": "ISC",
      "devDependencies": {
        "babel-core": "^6.16.0",
        "babel-loader": "^6.2.5",
        "babel-preset-es2015": "^6.14.0",
        "css-loader": "^0.25.0",
        "mustache-loader": "^0.3.0",
        "node-sass": "^3.4.2",
        "sass-loader": "^3.1.1",
        "scss-loader": "0.0.1",
        "style-loader": "^0.13.1",
        "url-loader": "^0.5.7",
        "webpack": "^1.13.2",
        "webpack-dev-server": "^1.16.1"
      },
      "dependencies": {
        "jquery": "^3.1.1"
      },
      "repository": {
        "type": "git",
        "url": ""
      },
      "bugs": {
        "url": ""
      },
      "homepage": ""
    }


## webpack.config.js 配置预览

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


## 手动安装模块说明

#### ☛ 安装 `webpack`，建议本地安装，减少依赖

    `$ npm install webpack --save-dev`
    
#### ☛ 如果需要使用 webpack 开发者工具，要单独安装

    `$ npm install webpack-dev-server --save-dev`

#### ☛ [安装各种 loader：模块和资源的转换器](https://webpack.github.io/docs/usage.html)

> Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。

**（1）安装 style/css/sass loader**

    $ npm install --save-dev style-loader css-loader sass-loader
    
> 如果有问题，需要安装 node-sass
    
配置 `webpack.config.js`

    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css!sass'
        }]
    }

**（2）将 ES2015 转换成 ES6**

安装 Babel 和 preset：

    $ npm install --save-dev babel-core babel-preset-es2015

安装 `babel-loader`

    $ npm install --save-dev babel-loader

配置 `babelrc`

    { "presets": [ "es2015" ] }

配置 `webpack.config.js`

    module: {
        loaders: [{
            test: /\.js$/,
            // 排除 node_modules 下不需要转换的文件，可以加快编译
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
    
**(3) 安装需要的第三方库**

    npm install --save jquery babel-polyfill
    
    // --save：添加到 dependencies 中，表明是运行时所需要的库
    // 使用 babel-polyfill：ES2015 API 在旧的浏览器中也可以使用

**（4）[其他库](https://webpack.github.io/docs/list-of-loaders.html)**

**☛ 安装插件**

## 其他

github地址: 

[webpack_scaffold1](https://github.com/RukiQ/scaffoldsForFE/tree/master/webpack_scaffold1)

[webpack_scaffold2](https://github.com/RukiQ/scaffoldsForFE/tree/master/webpack_scaffold1)：在 webpack_scaffold1 的基础上进行更改，对 css 及第三方 js 库进行打包，并更改 `webpack.config.js` 中的启动本地服务的配置

## 具体参考

☂ 参考：

- [webpack getting-started](http://webpack.github.io/docs/tutorials/getting-started/)
- [Webpack傻瓜式指南（一）](https://zhuanlan.zhihu.com/p/20367175)
- [一小时包教会 —— webpack 入门指南](http://www.cnblogs.com/vajoy/p/4650467.html)
- [backbone-webpack demo](https://github.com/rickyleung/backbone-webpack)

☂ 问题解决参考：

- [webpack-dev-server 使用方法，看完还不会的来找我~](http://gold.xitu.io/entry/57b94d8879bc44005ba13b4c)
- [ERROR in Cannot find module 'node-sass'](http://www.jianshu.com/p/9850659c363e)