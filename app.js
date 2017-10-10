let path = require('path');
global.RootPath = path.resolve('');

// node lib
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

// router article
const apiRouter = require('./api/router');
app.use(apiRouter.routes());

// error handle
app.on('error', err => {
  console.error('server error', err)
});

const database = require('./database/db');

const port = 8000;
app.listen(port);

// log info
console.log(`Server running at http://127.0.0.1:${port}/`);