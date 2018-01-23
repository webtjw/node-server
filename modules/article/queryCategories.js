const HTTP_CONSTANT = require('../../http/http-constant');
const database = require('../../database/database');



let queryCategories = async (ctx, next) => {
  ctx.set(HTTP_CONSTANT.HEADERS.METHODS, 'POST')
  ctx.response.type = HTTP_CONSTANT.MIME.JSON;

  let result = await getAllCategoriesHandler();

  ctx.response.body = result;
}

let getAllCategoriesHandler = async () => {
  let result = await database.queryCategories();
  return result;
}

module.exports = queryCategories;
