var mysql = require('mysql');
var database = mysql.createPool({
  host: 'localhost',
  user: 'tanjiawei',
  password: 'secret',
  database: 'blog',
  connectionLimit: 10
});

database.connect(err => console.error(err));

module.exports = database;