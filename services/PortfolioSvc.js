const doAction = require('./db');

const { PORTFOLIO, PORTFOLIO_IMAGES } = require(`${APP_PATH}/constants/portfolioCoordTypes`);

class PortfolioSvc {
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
      },
    ]);

    return rows;
  }
}

module.exports = PortfolioSvc;
