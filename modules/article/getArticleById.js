const HTTP_CONSTANT = require('../../http/http-constant');
const database = require('../../database/database');
const showdown = require('showdown');


const converter = new showdown.Converter({
  omitExtraWLInCodeBlocks: true, // 省略代码块的新尾行
  strikethrough: true // 支持语法 ~~删除内容~~
});

let getArticleById = async (ctx, next) => {
  ctx.set(HTTP_CONSTANT.HEADERS.METHODS, 'POST')
  ctx.response.type = HTTP_CONSTANT.MIME.JSON;

  let result = await getArticleByIdHandler(ctx.request.body.id);

  ctx.response.status = 200;
  ctx.response.body = result;
}

let getArticleByIdHandler = async (id) => {
  if (id !== undefined && typeof id === 'number' && id >= 0) {
    let result = await database.query(`select * from article where id=${id}`)
    if (result && result.success && Array.isArray(result.data)) {
      result.data = result.data[0]
      result.data.tags = result.data.tags.split(',')
      
      result.data.codeText = converter.makeHtml(result.data.codeText)
    }
    
    return result
  } else return {
    success: false,
    data: null,
    message: '传参错误'
  }
}


module.exports = getArticleById;
