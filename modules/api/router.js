const KoaRouter = require('koa-router');
// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

apiRouter.get('/article', (context, next) => {
  console.log('article');
  context.response = 'hello';
})

module.exports = apiRouter;