# react\_webpack\_scaffold
a very simple scaffold with webpack and react

## 目录结构

asset/

- css/
- img/

src/

- entry.js ------------------------ 入口文件

.babelrc

index.html

package.json

webpack.config.js

## 运行命令

1. 安装依赖：`npm install`
2. 运行项目：`npm start`

## 配置预览

#### `package.json`：

	{
	  "name": "react_webpack_demo",
	  "version": "1.0.0",
	  "description": "a demo using react and webpack",
	  "main": "index.js",
	  "scripts": {
	    "start": "webpack-dev-server --port 8080 --hot --inline --progress --colors --devtool eval"
	  },
	  "author": "Ruth",
	  "license": "ISC",
	  "devDependencies": {
	    "babel-core": "^6.18.2",
	    "babel-loader": "^6.2.7",
	    "babel-preset-es2015": "^6.18.0",
	    "babel-preset-react": "^6.16.0",
	    "css-loader": "^0.25.0",
	    "extract-text-webpack-plugin": "^1.0.1",
	    "node-sass": "^3.11.2",
	    "react-router": "^3.0.0",
	    "sass-loader": "^4.0.2",
	    "style-loader": "^0.13.1",
	    "webpack": "^1.13.3",
	    "webpack-dev-server": "^1.16.2"
	  },
	  "dependencies": {
	    "react": "^15.3.2",
	    "react-dom": "^15.3.2"
	  }
	}

#### `webpack.config.js`：

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

#### `.babelrc`：

	{
	  "presets": [
	    "react", 
	    "es2015"
	  ],
	  "plugins": []
	}

## 其他

需要更多其它配置，请参考 [webpack_scaffold](https://github.com/RukiQ/webpack_scaffold)

github地址：[react\\_webpack\\_scaffold](https://github.com/RukiQ/scaffoldsForFE/tree/master/react_webpack_scaffold)

## 参考资源

1. [掘金-react 搜索](http://gold.xitu.io/search/react)

2. [【资料汇总】React (中文)](https://github.com/dingyiming/example-react/issues/1)

3. [React.js 2016 最佳实践](http://www.alloyteam.com/2016/01/reactjs-best-practices-for-2016/)

4. [React.js 教程](https://blog.risingstack.com/the-react-way-getting-started-tutorial/)

5. [React.js 官网](https://facebook.github.io/react/docs/hello-world.html)

6. [十分详细的React入门实例](http://blog.csdn.net/a153375250/article/details/52667739)

## 后记

搞配置的过程中，一直报错，原来是自己没有安装 `babel-preset-es2015` 和 `babel-preset-react`，导致即使在 `.babelrc` 中已经配置了还报错T_T，具体参看 [Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)
