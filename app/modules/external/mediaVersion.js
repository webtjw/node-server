const httpKit = require('../../toolkits/httpKit');

const getMediaVersion = async (ctx, next) => {
  httpKit.setAllowMethod(ctx, 'GET').setResponseType(ctx, 'json').setResponseCode(ctx, 200);
  ctx.response.body = {
    version: '0.0.1',
    download: '/mediaPackage_20180227_j51qd.zip'
  };
}

module.exports = getMediaVersion;