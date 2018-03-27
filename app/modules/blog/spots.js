const database = require('../../database/database');

const spots = {
  /* tags */
  async getAllTags () {
    return await database.query(`select * from tags`);
  },
  /* article */
  async getArticleById (id) {
    return await database.query(`select * from article where id=${id}`);
  }
}

module.exports = spots;
