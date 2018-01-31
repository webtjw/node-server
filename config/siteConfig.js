// 整站配置文件
let env_production = true; // 是否为生产环境

const nodeArgs = process.argv.splice(2); // 获取 node app 时是否带有参数 -dev
if (nodeArgs.length === 1 && nodeArgs[0] === '-dev') env_production = false;

module.exports = {
  port: env_production ? 80 : 3000, // app 监听端口
  origin: env_production ? 'http://www.webtjw.com' : 'http://127.0.0.1:3000' // 后端源
}