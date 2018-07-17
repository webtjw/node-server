const database = require('../../database/database');

const spots = {
  /* tags */
  async getAllTags () {
    return await database.query(`select * from tags`);
  },
  async getArticleByTag (tag, pageIndex, size) {
    return await database.query(`select id,title,tags,time from article where tags like '%${tag}%' order by time desc limit ${size * pageIndex},${size * (pageIndex + 1)}`);
  },
  async updateSingleTag (tag, increase) {
    const prevTagResult = await database.query(`SELECT * FROM tags WHERE name='${tag}'`);
    if (prevTagResult.success && prevTagResult.data[0]) {
      const prevNumber = parseInt(prevTagResult.data[0].number, 10);
      if ((prevNumber + increase) <= 0) {
        await database.query(`DELETE FROM tags WHERE name='${tag}'`);
      }
      else {
        await database.query(`UPDATE tags SET number = ${prevNumber} WHERE name='${tag}'`);
      }
    }
    else await database.query(`INSERT INTO tags (name, number) VALUES ('${tag}', ${increase})`);
  },
  /* article */
  async getArticleById (id) {
    return await database.query(`select * from article where id=${id}`);
  },
  async saveArticle (article) {
    const {id, title, tags, time, antecedent, code} = article;
    const des_decode = antecedent.replace(/'/g, '\\\'');
    const code_decode = code.replace(/'/g, '\\\'');
    // 'id' indicates that this article has existed in the db
    if (id) return await database.query(`update article set title='${title}',tags='${tags.toString()}',codeText='${code_decode}',description='${des_decode}' where id=${id}`);
    else return await  database.query(`insert into article (title,tags,time,description,codeText) values ('${title}','${tags.toString()}','${time}','${des_decode}','${code_decode}')`);
  },
  async getIndexArticle (size) {
    return await database.query(`select id,title,tags,time,description,codeText from article order by time desc limit ${size}`);
  },
  async getArchive (index, size) {
    return await database.query(`select id,title,tags,time from article order by time desc limit ${size * index},${size * (index + 1)}`);
  },
  async checkLogin (token) {
    return await database.query(`select * from developer where token='${token}'`);
  },
  async getViewNumber (id) {
    return await database.query(`select * from view_number where id=${id}`);
  },
  async setViewNumber (id, size = 1) {
    const checkResult = await spots.getViewNumber(id);
    if (!!checkResult.data.length) return await database.query(`UPDATE view_number SET time=${checkResult.data[0].time + size} WHERE id=${id}`);
    else return await database.query(`INSERT INTO view_number (id, time) VALUES (${id}, ${size})`);
  }
}

module.exports = spots;
