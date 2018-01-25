const path = require('path'),
  Koa = require('koa');

global.RootPath = path.resolve('');

const app = new Koa();

app.use(require('koa-bodyparser')());

// router init
require('./routes/initialize').init(app);


const cmdArgs = process.argv.splice(2);
if (cmdArgs.length === 1 && cmdArgs[0] === 'dev') app.listen(3000);
else app.listen(80);

// log info
console.log(`Server running at http://127.0.0.1:${port}/`);