const KoaRouter = require('koa-router');
const database = require('../database/database');
const moment = require('moment');
// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

// 跨域验证
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
.post('/article/save', async (ctx, next) => {
  let article = ctx.request.body;
  let {title, tags, codeText, category, id} = article;
  let result = null;
  
  if (title && tags && tags.length > 0 && codeText && category) {
    article.time = moment().format('YYYY-MM-D'); // yyyy-mm-dd

    // when id is lacking, it means adding new article
    if (!id) {
      result = await database.addArticle(article);
    } else {
      // otherwise, it means editing exitsed article
      result = await database.updateArticle(article);
    }


  } else {

  }

  ctx.set('Access-Control-Allow-Origin', '*'); // cors
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';
  ctx.response.body = {
    success: result.success,
    data: result.success ? {id: result.data.insertId} : result.data
  };
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

module.exports = apiRouter;