/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2018-11-21 15:36:18
 * @LastEditTime: 2020-04-30 13:40:17
 * @github: https://github.com/tianxiangbing
 */
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var config = require("../webpack.config.js");
config.entry={ app: [ path.resolve(__dirname, "../dev/app.js")] };
console.log(config.entry);
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {contentBase:'dev'});
server.listen(8090,function(){
    console.log('http://localhost:8090')
});
