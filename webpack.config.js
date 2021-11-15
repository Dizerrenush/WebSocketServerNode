const {resolve} = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const path = require("path");
require('dotenv').config({ path: './.env' });

const isProd = process.env.NODE_ENV === "production";

const config = {
  mode: isProd ? "production" : "development",
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    path: resolve(__dirname, "dist"),
    filename: "./js/[name].js",
    clean: true,
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
    fallback: {
      "fs": false,
      "os": false,
      "net":false,
      "tls":false,
      "utf-8-validate":false,
      "buffer": false,
      "util": false,
      "http": false,
      "https": false,
      "path": false,
      "assert": false,
      "crypto": false,
      "stream": false,
      "zlib": false,
      "url": false
    },
    extensions: [".scss", ".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", {targets: "defaults"}]],
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
    ],
  },
};

if (isProd) {
  config.optimization = {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  };
  config.devtool = "source-map";
} else {
  config.devServer = {
    port: 8082,
    open: true,
    hot: true,
    compress: true,
    static: "./dist",
    historyApiFallback: true
  };
  config.devtool = "inline-source-map";
}

module.exports = config;