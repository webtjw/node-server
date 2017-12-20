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
  // 更新某篇文章
  updateArticle (article) {
    return new Promise((resolve, reject) => {
      let tags = article.tags;
      article.tags = tags.toString();

      database.query(`update article set title='${article.title}',author='${article.author || ''}',category='${article.category}',tags='${article.tags}',time='${article.time}',codeText='${article.codeText}' where id=${article.id}`, result => {
        if (result.success) resolve(result);
        else reject(result);
      })
    })
  },
  // 新增文章
  addArticle (article) {
    return new Promise((resolve, reject) => {
      let tags = article.tags;
      article.tags = tags.toString();

      database.query(`insert into article (title,category,tags,time,codeText) values ('${article.title}','${article.category}','${article.tags}','${article.time}','${article.codeText}')`, result => {
        resolve(result);

        if (result.success) {
          database.updateCategory(article.category, 1);
          tags = tags.map(item => {
            return {name: item, type: 1}
          });
          database.updateTags(tags);
        }
      })
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
  // 更新 category
  updateCategory (category, type) {
    if (category) {
      database.query(`select * from category where name='${category}'`, result => {
        // same category has been counted in table
        if (result.success && result.data.length && Array.isArray(result.data)) {
          database.query(`update category set number=${result.data[0].number + type} where name='${category}'`, updateResult => {
            if (updateResult.success) logger.log(`[update category] [${category}] done.`)
            else logger.warn(`[update category] [${category}] failed.`)
          })
        } else {
          // there's no same category so i should create one.
          database.query(`insert into category (name, number) values ('${category}', 1)`, updateResult => {
            if (updateResult.success) logger.log(`[create category] [${category}] done.`)
            else logger.warn(`[create category] [${category}] failed.`)
          })
        }
      });
    } else logger.error(`[update category] failed for not passing params.`)
  },
  updateTags (tags) {
    tags && tags.forEach((item, index) => {
      database.query(`select * from tags where name='${item.name}'`, result => {
        if (result.success) {
          if (result.data && result.data.length && Array.isArray(result.data)) {
            database.query(`update tags set number=${result.data[0].number + item.type}`, updateResult => {
              if (updateResult.success) logger.log(`[update tags] [${item.name}] done.`);
              else logger.warn(`[update tags] [${item.name}] failed.`)
            });
          } else {
            database.query(`insert into tags (name, number) values ('${item.name}', 1)`, updateResult => {
              if (updateResult.success) logger.log(`[create tags] [${item.name}] done.`);
              else logger.warn(`[create tags] [${item.name}] failed.`)
            });
          }
        } else logger.error(`[update tags] [${item.name}] failed.`);
      })
    })
  }
};

module.exports = database;