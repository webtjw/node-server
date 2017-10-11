// normal routes
const indexRouter = require('./index');
app.use(indexRouter.routes());
const apiRouter = require('./api');
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
const RouterKit = {
  
};
module.exports = RouterKit;