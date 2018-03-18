const serverAuthentication = require('./serverAuthentication');

const prefixRoute = path => `/wechat${path}`;
// module detail
module.exports = router => {
  router.get(prefixRoute('/serverAuthentication'), serverAuthentication);
}