const HTTP_CONSTANT = require('../../http/http-constant');
const database = require('../../database/database');



let queryAttributes = async (ctx, next) => {
  ctx.set(HTTP_CONSTANT.HEADERS.METHODS, 'POST')
  ctx.response.type = HTTP_CONSTANT.MIME.JSON;

  let {categories, tags} = await queryAttributesHandler();

  ctx.response.body = {
    success: Boolean(categories && tags),
    data: {categories, tags}
  };
}

let queryAttributesHandler = async () => {
  let result1 = await database.queryCategories('id,name');
  let result2 = await database.queryTags();

  return {
    categories: result1.success ? result1.data : null,
    tags: result2.success ? result2.data : null
  }
}


module.exports = queryAttributes;
