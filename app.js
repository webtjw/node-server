const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const siteConfig = require('./config/siteConfig');
const dispatchRoute = require('./routes/dispatch');

global.globalConfig = siteConfig; // 全局的设置属性

// app 实例
const app = new Koa();

// TODO：埋点+日志处理

/* 封闭的请求解析中间件 */
app.use(koaBody({multipart: true})); // formdata 文件上传
app.use(require('koa-bodyparser')()); // 解析请求体

/* 具名路由分发处理 */
dispatchRoute(app);

/* 启动监听 */
app.listen(global.globalConfig.port);
console.log(`Server running at http://127.0.0.1:${port}/`);
