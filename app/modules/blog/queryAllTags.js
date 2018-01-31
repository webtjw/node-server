const httpKit = require('../../toolkits/httpKit');
const database = require('../../database/database');



let queryAllTags = async (ctx, next) => {
  let result = await getAllTagsHandler();

  httpKit.setResponseType(ctx, 'json').setAllowMethod(ctx, 'POST').setResponseCode(ctx, 200);
  ctx.response.body = result;
}

let getAllTagsHandler = async () => {
  let result = await database.queryTags();
  return result;
}


module.exports = queryAllTags;