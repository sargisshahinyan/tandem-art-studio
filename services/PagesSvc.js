const doAction = require('./db');

class PagesSvc {
  static async getPagesData(path = null) {
    let queryString = 'SELECT * FROM pages';
    let args = [queryString];

    if (typeof path === 'string') {
      args[0] += ' WHERE path = $1';
      args.push([path]);
    }

    const [{ rows }] = await doAction([
      {
        method: 'query',
        args,
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

  static async updatePageData(path, data) {
    if (typeof path !== 'string' || typeof data !== 'object') {
      console.error('Arguments: ', path, data);
      throw new TypeError('Invalid arguments');
    }

    await doAction([{
      method: 'query',
      args: [
        'UPDATE pages SET data = $1 WHERE path = $2',
        [JSON.stringify(data), path],
      ],
    }]);
  }
}

module.exports = PagesSvc;
