const ctxKit = require('../../../toolkits/ctxKit');
const database = require('../../database/database');
const {TABLE_NAME_ARTICLE, TABLE_NAME_CATE} = require('../../database/dbConfig');


let queryByIndex = async (ctx, next) => {
  let result = await queryByIndexHandler(ctx.request.body);

  ctxKit.setResponseType('json').setAllowMethod(ctx, 'POST').setResponseCode(200);
  ctx.response.body = result;
}

let queryByIndexHandler = async (params) => {
  let {queryType, value, number, index} = params;
  let columnName = '';

  if (queryType === TABLE_NAME_CATE) columnName = TABLE_NAME_CATE;
  else if (queryType === 'tags') {
    columnName = 'tags';
  }
  else return {success: false, message: 'wrong type of query'}

  let result = await database.queryByIndex(columnName, value, number, index);
  let sum = await database.querySumOfTable(TABLE_NAME_ARTICLE, columnName, value);
  let data = {
    sum: sum.data,
    list: result.data
  }
  result.data = data;

  return result;
}


module.exports = queryByIndex;
