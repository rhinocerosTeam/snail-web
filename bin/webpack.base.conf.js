/*
 * @Author: 徐长剑 
 * @Description: webpack 构建基础文件
 * @Date: 2018-07-31 17:27:53  
 * @Last Modified time: 2018-07-31 17:27:53 
 */

const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin"); //复制资源
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
const HappyPack = require("happypack");
const os = require("os");

const _config = require("../config");
const Utils = require("./utils");
const entrys = Utils.getEntry();
const htmls = Utils.htmlPlugins(entrys);
const HtmlWebpackPluginExc = Utils.HtmlWebpackPluginExc;
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const _includeDir = /(src|hefantv_share)/;
const _env = process.env.NODE_ENV;
// console.log(chalk.green(`当前环境========>${_env}`));





var config = {
    entry: entrys,
    output: {
        filename:
            _env === "development"
                ? "js/[name].js"
                : "js/[name].[chunkhash].js",
        publicPath: _config[_env]["publicPath"],
        path: _config[_env]["outPath"]
    },
    module: {
        rules: [
            /**
             * @description 处理vue的语法
             * @date 2018-07-31
             */
            {
                test: /\.vue$/,
                use: "vue-loader",
                include: _includeDir
            },
            /**
             * @description 转换处理es6语法
             * @date 2018-07-31
             */
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: _includeDir,
                use: "happypack/loader?id=happy-babel-js"
            },
            Utils.cssLoader(),
            Utils.cssLoader("less"),
            Utils.cssLoader("sass"),
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                include: _includeDir,
                use: "happypack/loader?id=happy-babel-html"
            },
            /**
             * @description 处理图片 并按照规则命名雪碧图
             * @date 2018-07-31
             */
            {
                test: /\.(png|svg|jpg|gif|jpeg|cur)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // limit: 1,
                            context: path.join(__dirname, "../dist"),
                            limit: 8192,
                            name: function(str) {
                                let url = "",
                                    index = 0,
                                    urlPath = "";
                                str = str.split(path.sep).join("/");

                                if (!str.includes("sprites")) {
                                    url = str.match(/src\/(\S*)/);
                                    if (url) {
                                        // 正常图片名字位置处理方式
                                        index = url[1].lastIndexOf("/");
                                        url = url[1].slice(0, index);
                                        return url + "/[name]-[hash:5].[ext]";
                                    } else {
                                        return "assets/img/common/[name]-[hash:5].[ext]";
                                    }
                                } else {
                                    // 需要转化成雪碧图名字位置处理方式
                                    let sprites = "";
                                    url = str.match(/sprites\/(\S*)/);
                                    index = url[1].lastIndexOf(".");
                                    sprites = url[1].slice(
                                        url[1].indexOf(".") + 1,
                                        index
                                    );
                                    url[0] = url[0].replace("sprites", sprites);
                                    url = url[0].replace(url[1], "");
                                    url = "assets/img/" + url;
                                    return url + "[name]-[hash:5].[ext]";
                                }
                            }
                            // publicPath: "/"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        /**
         * @description 定义可以省略的扩展名
         * @date 2018-07-31
         */
        extensions: [".js", ".json", ".jsx", ".less", ".css", ".vue", ".json"],
        /**
         * @description 定义路径的映射
         * @date 2018-07-31
         */
        alias: {
            vue$: "vue/dist/vue.esm.js",
            api: path.resolve(__dirname, "../src/api"),
            "@common": path.resolve(__dirname, "../src/js/com/common"),
            "@js": path.resolve(__dirname, "../src/js"),
            "@src": path.resolve(__dirname, "../src"),
            "@mockJson": path.resolve(__dirname, "../static/mockJson"),
            "@components": path.resolve(__dirname, "../src/components"),
            "@constant": path.resolve(__dirname, "../src/constant"),
            "@html": path.resolve(__dirname, "../src/html"),
            "@css": path.resolve(__dirname, "../src/css"),
            "@share": path.resolve(__dirname, "../../hefantv_share"),
            "@assets": path.resolve(__dirname, "../src/assets"),
            "@utils": path.resolve(__dirname, "../src/js/utils"),
            "@static": path.resolve(__dirname, "../static")
        }
    },
    optimization: {
        /**
         * @description 提取公共代码
         * @date 2018-07-31
         */
        splitChunks: {
            chunks: "initial", //initial(初始块)、async(按需加载块)、all(全部块)，默认为all
            minChunks: 2, //表示被引用次数，默认为1；
            // maxInitialRequests: 5, //最大的按需(异步)加载次数，默认为1；
            // minSize: 2, //表示在压缩前的最小模块大小，默认为0；
            // maxInitialRequests: 1, //最大的初始化加载次数，默认为1；
            minSize: 30000,
            cacheGroups: {
                commons: {
                    name: "vendors" //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成
                }
            }
        }
    },
    plugins: [
        /**
         * @description webpack 构建进度条
         * @date 2018-07-31
         */
        new ProgressBarPlugin({
            format:
                "  build [:bar] " +
                chalk.green.bold(":percent") +
                " (:elapsed seconds)"
        }),
        /**
         * @description 开启一个进程去处理 babel-loader 转换es6语法
         * @date 2018-07-31
         */
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: "happy-babel-html",
            //如何处理  用法和loader 的配置一样
            loaders: ["html-loader"],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true
        }),
        new HappyPack({
            id: "happy-babel-js",
            loaders: ["babel-loader?cacheDirectory=true"],
            threadPool: happyThreadPool,
            verbose: true
        }),

        /**
         * @description 定义全局量
         * @date 2018-07-31
         */
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: "lodash",
            "window._": "lodash"
        }),
        /**
         * @description 设置vue-loader 需要设置相应的VueLoaderPlugin插件
         * @date 2018-07-31
         */
        new VueLoaderPlugin(),

        /**
         * @description 复制资源插件
         * @date 2018-07-31
         */
        new CopyWebpackPlugin([
            {
                from: _config[_env].staticRootFrom,
                to: _config[_env].staticRootTo
            }
        ]),
        // /**
        //  * @description 提前打包不常修改的代码，第三方库等
        //  * @date 2018-07-31
        //  */
        // new webpack.DllReferencePlugin({
        //     context: __dirname, // 与DllPlugin中的那个context保持一致
        //     /**
        //         下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
        //         这样webpack打包时，会检测此文件中的映射，不会把存在映射的包打包进bundle.js
        //     **/
        //     manifest: require("../dll/vendor-manifest.json")
        // }),
        ...htmls,
        new HtmlWebpackPluginExc({
            jsPath: _config[_env]["jsPath"]
        })
    ],
    /**
     * @description 设置webpack 构建时候信息输出
     * @date 2018-07-31
     */
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }
};

module.exports = config;
