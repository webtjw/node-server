let path = require('path');
global.RootPath = path.resolve('');

// node lib
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

// routes
const indexRouter = require('./routes/index');
app.use(indexRouter.routes());
const apiRouter = require('./routes/api');
app.use(apiRouter.routes());
// static
app.use(require('koa-static')(__dirname + '/static', {
  maxage: 1000 * 60 * 60 * 24 * 1
}));
// 404
app.use(async (ctx, next) => {
  console.log('===> into 404');
  ctx.response.status = 404;
  ctx.redirect('/404.html');
})

// error handle
app.on('error', err => {
  console.error('server error', err)
});

const port = 3000;
app.listen(port);

// log info
console.log(`Server running at http://127.0.0.1:${port}/`);