const doAction = require('./db');

const { PORTFOLIO, PORTFOLIO_IMAGES } = require(`${APP_PATH}/constants/portfolioCoordTypes`);

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

  static async getPortfolios({ page = 1, per = 200 } = {}) {
    const [{ rows }] = await doAction([
      {
        method: 'query',
        args: [
          `SELECT 
            portfolio.*,
            json_agg(
              json_build_object(
                'name', sizes.name,
                'starts_from', sizes.starts_from,
                'x_coords', portfolio_coords.x_coords,
                'y_coords', portfolio_coords.y_coords
              )
            ) AS sizes
          FROM portfolio
          JOIN portfolio_coords ON portfolio.id = portfolio_coords.portfolio_id
          JOIN sizes ON sizes.id = portfolio_coords.size_id
          GROUP BY portfolio.id
          LIMIT $1 OFFSET $2;`,
          [per, page - 1],
        ],
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
