const doAction = require('./db');

class PagesSvc {
  static async getPagesData() {
    const [{ rows }] = await doAction({
      query: ['SELECT * FROM pages'],
    });

    return rows;
  }
}

module.exports = PagesSvc;
