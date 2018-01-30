const HTTP_CONSTANT = require('../http/http-constant');

const ctxKit = {
  // 响应头允许请求类型
  setAllowMethod (ctx, value) {
    ctx.set(HTTP_CONSTANT.HEADERS.METHODS, value);
    return ctxKit;
  },
  // 响应数据类型
  setResponseType (ctx, type) {
    if (type === undefined || type === 'json') ctx.response.type = HTTP_CONSTANT.MIME.JSON;
    else if (type === 'js') ctx.response.type = HTTP_CONSTANT.MIME.JAVASCRIPT;
    else if (type === 'text') ctx.response.type = HTTP_CONSTANT.MIME.TEXT;
    return ctxKit;
  },
  // 响应 http 状态码
  setResponseCode (ctx, code) {
    ctx.response.status = code;
    return ctxKit;
  },
  // 设置允许 http 请求头参数
  setAllowHeader (ctx, header) {
    ctx.set(HTTP_CONSTANT.HEADERS.HEADERS, header);
    return ctxKit;
  },
  // 设置允许 origin
  setAllowOrigin (ctx, origin) {
    ctx.set(HTTP_CONSTANT.HEADERS.ORIGIN, origin);
    return ctxKit;
  },
}

module.exports = ctxKit;