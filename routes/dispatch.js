const path = require('path');
const koaStatic = require('koa-static');
const router = require('./router');

const RouterKit = {
  app: null,
  init (server) {
    if (!server) throw new TypeError('wrong server in router initialization.');

    this.app = server;
    // 404 page
    this.init404();
  },
  init404 () {
    this.app.use(async (ctx, next) => {
      ctx.response.status = 404;
      
      let path = ctx.request.path;
      if (path.split('/')[1] === 'api') {
        ctx.response.type = 'application/json';
        ctx.response.body = {success: false, data: null, message: 'interface does not exist'}
      } else {
        ctx.redirect('/404.html');
      }
    })
  }
};

const dispatchRoute = app => {
  app.use(router.routes()); // 各个具体业务模块的路由

  app.use(koaStatic(path.resolve(__dirname, '../statics'))); // 静态文件夹

  // TODO：错误处理，写在这里可能不合适
  app.on('error', e => e);
}

module.exports = dispatchRoute;