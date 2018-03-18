const httpKit = require('../../toolkits/httpKit');
const crypto = require('crypto');
const token = 'a475d8ca3c9f4e088655652d09x89ve0';

module.exports = (ctx, next) => {
  const {signature, timestamp, nonce, echostr} = ctx.request.query;
  // token、timestamp、nonce 三个参数进行字典序排序
  const sortResult = [token, timestamp, nonce].sort();
  const sortStrings = sortResult.toString().replace(/,/g, '');
  // 进行 sha1 加密
  const sha1Code = crypto.createHash('sha1');
  const code = sha1Code.update(sortStrings, 'utf-8').digest('hex');
  // 开发者获得加密后的字符串可与 signature 对比，标识该请求来源于微信
  ctx.response.body = code === signature ? echostr : 'error';
}