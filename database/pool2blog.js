var mysql = require('mysql');
var pool2blog = mysql.createPool({
  host: 'localhost',
  user: 'tanjiawei',
  password: '123456',
  database: 'blog',
  connectionLimit: 10
});

module.exports = pool2blog;