const doAction = require('./db');

class PagesSvc {
  static async getPagesData() {
    const [{ rows }] = await doAction([
      {
        method: 'query',
        args: ['SELECT * FROM pages'],
      }
    ]);

    return rows;
  }

  static async getPortfolios({ page = 1, per = 50 }) {
    const [{ rows }] = await doAction([
      {
        method: 'query',
        args: ['SELECT * FROM portfolio LIMIT $1 OFFSET $2', [per, page - 1]],
      }
    ]);

    return rows;
  }
}

module.exports = PagesSvc;
