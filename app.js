const path = require('path'),
  Koa = require('koa');

global.RootPath = path.resolve('');

const app = new Koa();

// router init
require('./routes/initialize').init(app);

const port = 3000;
app.listen(port);

// log info
console.log(`Server running at http://127.0.0.1:${port}/`);