/*
 * @Author: 徐长剑 
 * @Description: 浏览器端dev环境修改代码刷新页面
 * @Date: 2018-07-31 15:58:05  
 * @Last Modified time: 2018-07-31 15:58:05 
 */

// eventsource-polyfill用于扩展Event-Source对象在IE浏览器下的兼容性
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// 给webpack-hot-middleware注册个事件 当action === 'reload' 时 页面自动刷新
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
