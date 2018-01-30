const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');

global.RootPath = path.resolve('');

const app = new Koa();

app.use(koaBody({multipart: true})); // 文件上传，注意书写的位置很重要，否则无法上传

app.use(require('koa-bodyparser')()); // 解析请求体

// router init
require('./routes/initialize').init(app);


const cmdArgs = process.argv.splice(2);
let port = 80;
if (cmdArgs.length === 1 && cmdArgs[0] === '-dev') port = 3000;
app.listen(port);

// log info
console.log(`Server running at http://127.0.0.1:${port}/`);