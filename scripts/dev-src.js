var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var config = require("../webpack.config.js");
config.entry={ app: [ path.resolve(__dirname, "../dev/app.js")] };
console.log(config.entry);
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {contentBase:'dev'});
server.listen(8090);
