const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // Output images into a separate images directory
    assetModuleFilename: "images/[hash][ext][query]"
  },

  module: {
    // Will need to handle images in this photo tagging app
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
  ],

  devtool: "source-map",

  devServer: {
    static: "./dist",
    hot: true,
  },
}