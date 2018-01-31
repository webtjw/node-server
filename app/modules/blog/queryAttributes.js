const ctxKit = require('../../../toolkits/ctxKit');
const database = require('../../database/database');



let queryAttributes = async (ctx, next) => {
  let {categories, tags} = await queryAttributesHandler();

  ctxKit.setResponseType('json').setAllowMethod(ctx, 'POST').setResponseCode(200);
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
