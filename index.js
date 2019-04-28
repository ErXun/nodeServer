//实现一个能处理路由，支持静态目录的 server
var http = require('http')// 通过 require 加载 node.js 的内置模块 http
var fs = require('fs')//读，写文件
var url = require('url')//服务器接收 request 后，定位所需文件的 URL，读取文件内容，最后发给服务器

// 创建服务器
var server = http.createServer(function(request,response){
    response.setHeader("Content-Type","text/html; charset=UTF-8")//设置响应头格式
    var pathObj = url.parse(request.url,true)//解析url
    console.log(pathObj.pathname)
    switch(pathObj.pathname){
        //mock 数据
        case '/getWeather':
            response.end(JSON.stringify({a:1,b:2}))
            break;
        // 处理路由
        case '/user':
            response.end(fs.readFileSync(__dirname + '/sample/a.text'))
            break;
        //处理静态目录
        default:
            response.end(fs.readFileSync(__dirname + '/sample' + pathObj.pathname))
    }
   
})
server.listen(9000)//服务器监听接口
console.log("open http://localhost:9000")