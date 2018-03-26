const serverAuthentication = require('./serverAuthentication');

const prefixRoute = path => `/wechat${path}`;
// module detail
module.exports = router => {
  router.get(prefixRoute('/serverAuthentication'), serverAuthentication);
  router.post(prefixRoute('/order'), async (ctx, next) => {
    const {type, code} = ctx.request.body;
    const customeOrder = {
      '1234': {order: 16513113166, price: '99.99', time: '2018-02-03 14:22:22'},
      '1234': {order: 16513113166, price: '88.88', time: '2018-02-03 14:22:22'},
      '1234': {order: 16513113166, price: '77.77', time: '2018-02-03 14:22:22'}
    }
    if (customeOrder[code]) {
      ctx.response.type = 'application/json';
      ctx.response.body = customeOrder[code];
    } else ctx.response.body = `短码 ${code} 对应订单不存在`
  });
}