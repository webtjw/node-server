const ctxKit = require('../../../toolkits/ctxKit');
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
  
  ctxKit.setResponseType('json').setAllowMethod(ctx, 'POST').setResponseCode(200);
  ctx.response.body = result;
}


module.exports = getHistory;
