const HTTP_CONSTANT = require('../../http/http-constant');
const database = require('../../database/database');


let getHistory = async (ctx, next) => {
  let {index, size} = ctx.request.body;
  let result = null;

  if (index && size && index > 0 && size > 1) {
    let qrs = await database.queryHistoryArticle(index, size);
    result = qrs;
  } else {
    result = {success: false, data: null, message: 'wrong params'}
  }
  
  ctx.set(HTTP_CONSTANT.HEADERS.METHODS, 'POST')
  ctx.response.type = HTTP_CONSTANT.MIME.JSON;
  ctx.response.body = result;
}


module.exports = getHistory;
