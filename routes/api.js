const KoaRouter = require('koa-router');
const pool2blog = require('../database/pool2blog');
// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

apiRouter.get('/article/:id', async (ctx, next) => {
  console.log('===> article visited');
  
  let id = ctx.params.id;
  let result = await new Promise((resolve, reject) => {
    pool2blog.query(`SELECT * FROM article WHERE id=${id}`, (error, result, fields) => {
      if (error) throw error;
  
      resolve(result);
    })
  })
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})

module.exports = apiRouter;