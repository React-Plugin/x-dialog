var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var EXAMPLES_DIR = path.resolve(__dirname, "examples");

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

function buildEntries() {
  return fs.readdirSync(EXAMPLES_DIR).reduce(function(entries, dir) {
    if (dir === "build") return entries;

    var isDraft = dir.charAt(0) === "_";

    if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, dir)))
      entries[dir] = path.join(EXAMPLES_DIR, dir, "app.js");
    console.log(entries);
    return entries;
  }, {});
}

var extractCSS = new ExtractTextPlugin("[name].css");
var modulesDirectories = ["web_modules", "node_modules", "bower_components","src"];
module.exports = {
  entry: buildEntries(),
  devtool :"source-map",
  output: {
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    path: "/__build__",
    publicPath: "js"
  },
  resolve: {
      modulesDirectories: modulesDirectories,
      extensions: ['', '.js', '.jsx', '.css',".scss"]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.(eot|woff|ttf|svg)/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loader: extractCSS.extract('style-loader', 'css?sourceMap!sass?sourceMap')
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract(
          "style-loader",
          "css?sourceMap"
        )
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.png$/,
        loader: "file-loader?name=[hash:8].[name].[ext]"
      }
    ]
  },
  plugins: [extractCSS, new webpack.optimize.CommonsChunkPlugin("shared.js"),new webpack.optimize.DedupePlugin()]
};