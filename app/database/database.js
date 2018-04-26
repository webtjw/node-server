const mysql = require('mysql');
const DBUtils  = require('./DBUtils');
const config = require('./dbConfig');

let pool2blog = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.databaseName,
  connectionLimit: config.connectionLimit
});

let database = {
  async query (sql) {
    return new Promise((resolve, reject) => {
      pool2blog.query(sql, (mysqlError, result, fields) => {
        if (mysqlError) {
          console.log(mysqlError)
          resolve({
            success: false,
            data: null,
            message: mysqlError.sqlMessage || '数据库操作失败'
          });
        }
        else resolve({
          success: true,
          data: result,
          message: ''
        });
      })
    }).catch(e => console.log(e));
  }
}

module.exports = database;