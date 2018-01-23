const HTTP_CONSTANT = require('../../http/http-constant');
const database = require('../../database/database');


const maxAge = 1000 * 60 * 60 * 24; // 一天的缓存时间

let login = async (ctx, next) => {
  ctx.set(HTTP_CONSTANT.HEADERS.METHODS, 'POST')
  ctx.response.type = HTTP_CONSTANT.MIME.JSON;
  ctx.response.status = 200;

  const {token} = ctx.request.body;
  let result = await database.queryDeveloper(token);

  if (result.success) {
    if (Array.isArray(result.data) && result.data.length === 0) {
      result.success = false;
      result.message = '口令错误';
      ctx.cookies.set('developer', false);
    } else {
      result.data = result.data[0];
      ctx.cookies.set('developer', true, {
        maxAge,
        httpOnly: false
      })
    }
  }
  
  ctx.response.body = result;
}


module.exports = login;
