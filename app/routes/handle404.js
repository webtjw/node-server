const httpKit = require('../toolkits/httpKit');

const handle404 = async (ctx, next) => {
  console.log(`request 404: ${ctx.request.url}`)
  httpKit.setResponse(ctx, {status: 404});

  // const acceptString = ctx.request.headers.accept;
  // const accept = acceptString.replace(/\s/g, '').split(',');
  // 根据请求 accept 决定返回内容
  // 如果是 api 类，返回 json
  // 其他则重定向到 404 页面
  // if (path.split('/')[1] === 'api') {
  //   httpKit.setResponseType(ctx, 'json');
  //   ctx.response.body = {success: false, data: null, message: 'interface does not exist'}
  // } else {
  //   ctx.redirect('/404.html');
  // }
}

module.exports = handle404;
