const httpKit = require('../../toolkits/httpKit');
const database = require('../../database/database');
const showdown = require('showdown');
const showdownHighlight = require("showdown-highlight")


const converter = new showdown.Converter({
  omitExtraWLInCodeBlocks: true, // 省略代码块的新尾行
  strikethrough: true, // 支持语法 ~~删除内容~~
  extensions: [showdownHighlight]
});

let getArticleById = async (ctx, next) => {
  httpKit.setAllowMethod(ctx, 'POST').setResponseType(ctx, 'json').setResponseCode(ctx, 200);

  const {id, useMarkdown} = ctx.request.body;
  let result = await getArticleByIdHandler(id, useMarkdown);

  ctx.response.body = result;
}

let getArticleByIdHandler = async (id, useMarkdown) => {
  if (id !== undefined && typeof id === 'number' && id >= 0) {
    let result = await database.query(`select * from article where id=${id}`)
    if (result && result.success && Array.isArray(result.data)) {
      result.data = result.data[0]
      result.data.tags = result.data.tags.split(',')
      
      !useMarkdown && (result.data.codeText = converter.makeHtml(result.data.codeText));
    }
    
    return result
  } else return {
    success: false,
    data: null,
    message: '传参错误'
  }
}


module.exports = getArticleById;
