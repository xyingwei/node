//模块加载
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

//开放静态资源
app.use('/public/',express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))


//加载express-art-template模块引擎
app.engine('html', require('express-art-template'))

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// 把路由容器挂载到 app 服务中
app.use(router)


app.listen('5001',function(){
    console.log('running...');
    
})