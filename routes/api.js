const KoaRouter = require('koa-router');
const pool2blog = require('../database/pool2blog');
// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

apiRouter.get('/article/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await new Promise((resolve, reject) => {
    pool2blog.query(`select * from article`, (error, result, fields) => {
      if (error) throw error;
  
      resolve(result);
    })
  })
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})

apiRouter.get('/article/latest/:number', async (ctx, next) => {
  let number = ctx.params.number;
  let result = await new Promise((resolve, reject) => {
    pool2blog.query(`select * from article order by id desc limit ${number}`, (error, result, fields) => {
      if (error) throw error;
  
      resolve(result);
    })
  })
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})

module.exports = apiRouter;