const path = require('path')
const {name} = require('./package');
var webpack = require('webpack')
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
  // publicPath: BASE_URL,
  // 配置端口
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 8085 // 端口
    // 设置代理
    // proxy: {
    //   '/sys': {
    //     target: 'http://localhost:8080/netmgr',  // target host
    //     ws: true,  // proxy websockets
    //     changeOrigin: true,  // needed for virtual hosted sites
    //     pathRewrite: {
    //       '^/sys': ''  // rewrite path
    //     }
    //   },
    // }
  },
  assetsDir: 'static',
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
    config.module
      .rule("fonts")
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use("url-loader")
      .loader("url-loader")
      .tap(options => ({name: "/fonts/[name].[hash:8].[ext]"}))
      .end();
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   proxy: 'localhost:3000'
  // }
}
