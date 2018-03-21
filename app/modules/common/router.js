const allowCORS = require('./allowCORS');
const upload = require('./uploadAsync');

module.exports = router => {
  router.options('*', allowCORS);
  router.post('/common/upload', upload);
}
