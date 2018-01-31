const ctxKit = require('../../../toolkits/ctxKit');
const database = require('../../database/database');



let queryAllTags = async (ctx, next) => {
  let result = await getAllTagsHandler();

  ctxKit.setResponseType('json').setAllowMethod(ctx, 'POST').setResponseCode(200);
  ctx.response.body = result;
}

let getAllTagsHandler = async () => {
  let result = await database.queryTags();
  return result;
}


module.exports = queryAllTags;