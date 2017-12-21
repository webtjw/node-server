const mysql = require('mysql');
const DBUtils  = require('./DBUtils');
const config = require('./dbConfig');
const logger = require('../tookits/logger');

let pool2blog = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.databaseName,
  connectionLimit: config.connectionLimit
});

let database = {
  // 封装好的执行 sql 语句操作
  query (sql, callback) {
    pool2blog.query(sql, (mysqlError, result, fields) => {
      if (mysqlError) {
        logger.error(mysqlError.toString());
        callback({
          success: false,
          data: mysqlError.sqlMessage || '数据库查询操作失败'
        });
      } else {
        callback({
          success: true,
          data: result
        });
      }
    })
  },
  // 查询最新的文章
  queryLatestArticle (number) {
    return new Promise((resolve, reject) => {
      database.query(`select * from article order by id desc limit ${number}`, result => {
        if (result.success) resolve(result);
        else reject(result);
      })
    })
  },
  // 查询某篇文章
  querySpecificArticle (id) {
    return new Promise((resolve, reject) => {
      database.query(`select * from article where id=${id}`, result => {
        if (result.success) resolve(result);
        else reject(result);
      })
    })
  },
  /**
   * 更新文章
   * @param article: Object
   * @param article.id: required Number
   * @param article.title: required String
   * @param article.author: String 
   * @param article.category: required String
   * @param article.tags: required Array
   * @param article.codeText: required String
   */
  updateArticle (article) {
    return new Promise((resolve, reject) => {
      let tags = article.tags.toString();

      database.query(`select * from article where id=${article.id}`, queryResult => {
        if (queryResult.success) {
          database.query(`update article set title='${article.title}',author='${article.author || ''}',category='${article.category}',tags='${tags}',time='${article.time}',codeText='${article.codeText}' where id=${article.id}`, updateResult => {
            if (updateResult.success && queryResult.data.length && Array.isArray(queryResult.data)) {
              updateResult.origin = queryResult.data[0];
              resolve(updateResult);
              console.log(`[update article] [${article.title}] success`);
            } else reject(updateResult);
          });
        } else reject(queryResult);
      })
    })
  },
  /**
   * 新增文章
   * @param article: Object
   * @param article.title: required String
   * @param article.author: String 
   * @param article.category: required String
   * @param article.tags: required Array
   * @param article.codeText: required String
   */
  addArticle (article) {
    return new Promise((resolve, reject) => {
      database.query(`insert into article (title,category,tags,time,codeText) values ('${article.title}','${article.category}','${article.tags}','${article.time}','${article.codeText}')`, result => {
        resolve(result);
        console.log(`[add article] [${article.title}] success`);
      });
    });
  },
  // 查询 token
  queryToken (token) {
    return new Promise((resolve, reject) => {
      database.query(`select * from developer where token='${token}'`, result => {
        if (result.success) resolve(result)
        else reject(result)
      })
    })
  },
  /**
   * 更新 category
   * @param category: Object
   */
  updateCategory (category) {
    for (let key of Object.keys(category)) {
      database.query(`select * from category where name='${key}'`, queryResult => {
        // If same category has been counted in table
        // Otherwise, i should create one.
        if (queryResult.success && queryResult.data.length && Array.isArray(queryResult.data)) {
          database.query(`update category set number=${queryResult.data[0].number + category[key]} where name='${key}'`, updateResult => {
            if (updateResult.success) console.log(`[update category] [${key}] done.`)
            else console.warn(`[update category] [${key}] failed.`)
          })
        } else {
          database.query(`insert into category (name, number) values ('${key}', 1)`, updateResult => {
            if (updateResult.success) console.log(`[insert category] [${key}] done.`)
            else console.warn(`[insert category] [${key}] failed.`)
          })
        }
      });
    }
  },
  updateTags (tags) {
    for (let key of Object.keys(tags)) {
      database.query(`select * from tags where name='${key}'`, queryResult => {
        if (queryResult.success) {
          if (queryResult.data && queryResult.data.length && Array.isArray(queryResult.data)) {
            database.query(`update tags set number=${queryResult.data[0].number + tags[key]}`, updateResult => {
              if (updateResult.success) console.log(`[update tags] [${key}] done.`);
              else console.warn(`[update tags] [${key}] failed.`)
            });
          } else {
            database.query(`insert into tags (name, number) values ('${key}', 1)`, updateResult => {
              if (updateResult.success) console.log(`[insert tags] [${key}] done.`);
              else console.warn(`[insert tags] [${key}] failed.`)
            });
          }
        } else console.error(`[update tags] [${key}] failed.`);
      })
    }
  }
};

module.exports = database;