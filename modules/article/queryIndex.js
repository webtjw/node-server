const HTTP_CONSTANT = require('../../http/http-constant');
const database = require('../../database/database');


let queryIndex = async (ctx, next) => {
  ctx.set(HTTP_CONSTANT.HEADERS.METHODS, 'POST')
  ctx.response.type = HTTP_CONSTANT.MIME.JSON;

  let result = await getIndexHandler();

  ctx.response.status = 200;
  ctx.response.body = result;
}

let getIndexHandler = async () => {
  let array = []; // 返回的数据列表
  // 放在首页的 category id
  let cateIdArray = [
    {name: '前端', max: 10},
    {name: '短笔记', max: 5},
    {name: '生活与读书', max: 3}
  ];

  for (let cateItem of cateIdArray) {
    let itemResult = await database.queryArticleByCateId(cateItem.name, cateItem.max);
    let article = itemResult.data;

    article.forEach(item => item.tags = item.tags.split(','));

    // 拼接字段
    array.push ({
      title: cateItem.name,
      list: itemResult.success ? itemResult.data : []
    })
  }
  
  return {
    success: true,
    data: array,
    message: ''
  }
}


module.exports = queryIndex;
