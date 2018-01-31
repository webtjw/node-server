const ctxKit = require('../../../toolkits/ctxKit');
const database = require('../../database/database');



let queryCategories = async (ctx, next) => {
  let result = await getAllCategoriesHandler();

  ctxKit.setResponseType('json').setAllowMethod(ctx, 'POST').setResponseCode(200);
  ctx.response.body = result;
}

let getAllCategoriesHandler = async () => {
  let result = await database.queryCategories();
  return result;
}

module.exports = queryCategories;
