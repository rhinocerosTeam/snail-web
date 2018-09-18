const merge = require("webpack-merge");
const webpackBase = require("./webpack.base.conf");
const webpack = require("webpack");
/**
 * 将event-source相关代码，添加到每个入口chunk中，作为HRM Runtime的一部分。
 * 后端相应的配置见dev-server的hotMiddleware部分
 */
Object.keys(webpackBase.entry).forEach(function(name) {
    webpackBase.entry[name] = ["./bin/dev-client.js"].concat(
        webpackBase.entry[name]
    );
});

module.exports = merge(webpackBase, {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //启用 HMR 模块热替换插件
        new webpack.NoEmitOnErrorsPlugin() //报错提示插件:报错不阻塞，但是编译后给出提示
    ]
})
