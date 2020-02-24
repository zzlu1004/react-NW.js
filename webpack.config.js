const path = require('path') // 引入‘path’
const HTMLPlugin = require('html-webpack-plugin')

// var webpack = require('webpack')

module.exports = {
  // 应用入口
  entry: {
    app: path.join(__dirname, './src/index.js') // index.js作为打包的入口
  },
  // 输出目录
  output: {
    filename: 'build.js',
    // filename: '[name].[hash:8].js', //name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
    path: path.join(__dirname, 'dist'), // 打包好之后的输出路径
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(js|jsx)$/, //使用loader的目标文件。这里是.js
      use: {
        loader: 'babel-loader',
        // options: {
        //     presets: ["env", "react"] //['@babel/preset-react']
        // },
      },
      exclude: [
        path.join(__dirname, '../node_modules') // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
      ]
    }, {
      test: /\.(jpg|png|jpeg|gif)$/,
      use: {
        loader: "url-loader"
      }
    }]
  },
  devServer: {
    // inline: true,
    index: 'index.html',
    port: 8000
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html', //制定的文件，默认
      template: 'index.html' //制定html生成使用的模板文件 
    }), // 生成一个html页面，同时在webpack编译的时候。把我们所生成的entry都注入到这个html页面中,路径都是根据我们output配置的来走的。
  ]
}