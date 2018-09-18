/*
 * @Author: 徐长剑 
 * @Description: dev环境启动server服务 注册添加热启动
 * @Date: 2018-07-31 15:58:51  
 * @Last Modified time: 2018-07-31 15:58:51 
 */
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const path = require("path");
const chalk = require("chalk");
const webpackBaseConf = require("./webpack.server.conf");
const compiler = webpack(webpackBaseConf);
const config = require("../config");
const opn = require("opn");
const app = express();
const _port = config.development.port || 3333
/**
 * 将compiler挂载在dev-server上，监听本地代码变化，变化则启动编译并将编译后的文件暂存到内存中
 */
var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackBaseConf.output.publicPath,
    // hot: true,
    stats: {
        colors: true,
        chunks: false, //添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
        env: true, // 添加 --env information
        cachedAssets: false, // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
        children: false // 添加 children 信息
    }
});
var hotMiddleware = webpackHotMiddleware(compiler);

// //当代码修改，页面自动刷新
compiler.hooks.compilation.tap("HtmlWebpackHotMidd", function(compilation) {
    // hotMiddleware.publish({ action: "reload" });
    compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync(
        "HtmlWebpackHotMidd",
        function(data, cb) {
            hotMiddleware.publish({ action: "reload" });
            cb();
        }
    );
});
app.use('/dist',express.static(path.resolve(__dirname, "../dist")));
app.use(devMiddleware);
app.use(hotMiddleware);

// Serve the files on port 3000.
app.listen(_port, function() {
    console.log(
        "listening on port" + chalk.green(`http://localhost.hefantv.com:${_port}/index.html`)
    );
    opn(`http://localhost.hefantv.com:${_port}/index.html`);
});
