const httpKit = require('../../toolkits/httpKit');
const database = require('../../database/database');


const maxAge = 1000 * 60 * 60 * 24; // 一天的缓存时间

let login = async (ctx, next) => {
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
  
  httpKit.setResponseType(ctx, 'json').setAllowMethod(ctx, 'POST').setResponseCode(ctx, 200);
  ctx.response.body = result;
}


module.exports = login;
