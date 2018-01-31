const httpKit = require('../../toolkits/httpKit');
const database = require('../../database/database');



let queryAttributes = async (ctx, next) => {
  let {categories, tags} = await queryAttributesHandler();

  httpKit.setResponseType(ctx, 'json').setAllowMethod(ctx, 'POST').setResponseCode(ctx, 200);
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
