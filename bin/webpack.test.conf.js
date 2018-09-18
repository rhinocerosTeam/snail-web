const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBase = require("./webpack.base.conf");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //清除插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css代码压缩
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const path = require("path");

module.exports = merge(webpackBase, {
    mode: "production",
    devtool: "source-map", // 使用eval打包源文件模块,在同一个文件中生成完整sourcemap
    plugins: [
        /**
         * @description 清除dist文件夹下所有文件插件
         * @date 2018-07-31
         */
        new CleanWebpackPlugin("dist", {
            root: path.resolve(__dirname, "../")
        }),
        /**
         * @description 定义全局变量插件
         * @date 2018-07-31
         */
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("testing")
        }),
        /**
         * @description 提取css代码
         * @date 2018-07-31
         */
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash].css",
            allChunks: true
        }),
        /**
         * @description 压缩css插件
         * @date 2018-07-31
         */
        new OptimizeCSSAssetsPlugin({}),
        /**
         * @description 分析构建的性能
         * @date 2018-07-31
         */
        // new BundleAnalyzerPlugin()
    ]
});