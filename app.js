const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const dispatchRoute = require('./app/routes/dispatchRoute')
const config = require('./app/config')

const app = new Koa() // app 实例


/* 封闭的请求解析中间件 */
app.use(koaBody({multipart: true})) // formdata 文件上传
app.use(require('koa-bodyparser')()) // 解析请求体

/* 具名路由分发处理 */
dispatchRoute(app)

/* 启动监听 */
const port = 3001
app.listen(port)
console.log(`Server running at port ${port}.`)
