const HTTP_CONSTANT = require('../../http/http-constant');
const database = require('../../database/database');



let queryAllTags = async (ctx, next) => {
  ctx.set(HTTP_CONSTANT.HEADERS.METHODS, 'POST')
  ctx.response.type = HTTP_CONSTANT.MIME.JSON;
  
  let result = await getAllTagsHandler();

  ctx.response.body = result;
}

let getAllTagsHandler = async () => {
  let result = await database.queryTags();
  return result;
}


module.exports = queryAllTags;