const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: __dirname + "/src/index.tsx",
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  watch: true,
  devServer: {
    static: __dirname + "/public/",
    port: 3033, //  change the port
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: "/node_modules",
        loader: "babel-loader"
      },
      {
        test: /\.(tsx|ts)?$/,
        exclude: "/node_modules",
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.js', ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html"
    }),
    new webpack.ProvidePlugin({
      "React": "react",
    }),
  ]
}