const KoaRouter = require('koa-router');
const database = require('../database/database');
const moment = require('moment');
const {saveArticle} = require('../modules/article');

// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

// cors pre-check
apiRouter.options('*', ctx => {
  ctx.response.status = 204;
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS');
})

apiRouter.get('/article/latest', async (ctx, next) => {
  let result = await database.queryLatestArticle(ctx.query.length || 1);
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})
.post('/login', async (ctx, next) => {
  let data = ctx.request.body;
  let result = await database.queryToken(data.token);
  

  ctx.set('Access-Control-Allow-Origin', '*'); // cors
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.response.type = 'application/json';

  // one of the developer in db
  if (result.success && result.data.length == 1) {
    let developer = result.data[0];
    if (developer.name && developer.token) {
      ctx.response.body = {success: true};
      // 身份秘钥算法因素：ip name token date
    }
  } else {
    ctx.response.body = {
      success: false,
      errorMsg: '口令有误，请检查你的输入'
    };
  }
  
})
.get('/article/detail/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await database.querySpecificArticle(id);

  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})


apiRouter.post('/article/save', saveArticle);

module.exports = apiRouter;