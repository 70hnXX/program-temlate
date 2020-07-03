const path = require("path");
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // webpack-dev-server 相关配置
  devServer: {
    port: 7878,
    //  contentBase: path.join(__dirname, "dist"),
    proxy: null, // 设置代理
    open: true,
  },
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    (config.entry.app = ["babel-polyfill", "./src/main.js"]), //babel-polyfill 来将 ES6 的语法转到 ES5，作用为在IE 中使用 axios
      config.resolve.alias.set("@", path.join(__dirname, "src")); //设置别名
  },
  transpileDependencies: ["vue-clamp", "resize-detector"],
  configureWebpack: (config) => {
    // 打包屏蔽console
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    // 压缩打包
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
  }
};
