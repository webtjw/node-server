const httpKit = require('../../toolkits/httpKit');
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
  
  httpKit.setResponseType(ctx, 'json').setAllowMethod(ctx, 'POST').setResponseCode(ctx, 200);
  ctx.response.body = result;
}


module.exports = getHistory;
