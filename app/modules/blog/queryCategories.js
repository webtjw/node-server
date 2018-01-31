const httpKit = require('../../toolkits/httpKit');
const database = require('../../database/database');



let queryCategories = async (ctx, next) => {
  let result = await getAllCategoriesHandler();

  httpKit.setResponseType(ctx, 'json').setAllowMethod(ctx, 'POST').setResponseCode(ctx, 200);
  ctx.response.body = result;
}

let getAllCategoriesHandler = async () => {
  let result = await database.queryCategories();
  return result;
}

module.exports = queryCategories;
