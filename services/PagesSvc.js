const doAction = require('./db');

class PagesSvc {
  static async getPagesData() {
    return (await doAction({
      query: ['SELECT * FROM pages'],
    }))[0];
  }
}

module.exports = PagesSvc;
