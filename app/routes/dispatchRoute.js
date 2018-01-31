const path = require('path');
const koaStatic = require('koa-static');
const router = require('./router');
const handle404 = require('./handle404');

const dispatchRoute = app => {
  app.use(koaStatic(path.resolve(__dirname, '../../statics'))); // 静态文件夹
  app.use(router.routes()); // 各个具体业务模块的路由
  app.use(handle404); // 404 处理

  // TODO：错误处理，写在这里可能不合适
  app.on('error', e => e);
}

module.exports = dispatchRoute;