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
          JOIN portfolio_coords ON portfolio.id = portfolio_coords.id
          JOIN sizes ON sizes.id = portfolio_coords.size_id
          GROUP BY portfolio.id
          LIMIT $1 OFFSET $2;`,
          [per, page - 1],
        ],
      },
    ]);

    return rows;
  }

  static async addPortfolio(data) {
    const {
      title,
      description,
      presentablePicture,
      mainPicture,
      xCoords,
      yCoords,
      rowsCount,
      columnsCount,
      rowHeight,
      images,
    } = data;

    const [{ rows: [{ id }] }] = await doAction([{
      method: 'query',
      args: [
        `INSERT INTO portfolio (title, description, presentable_picture, main_picture, rows_count, columns_count, row_height)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [title, description, presentablePicture, mainPicture, rowsCount, columnsCount, rowHeight],
      ],
    }]);

    await Promise.all([
      doAction(
        Array(3)
          .fill(null)
          .map((v, i) => ({
            method: 'query',
            args: [
              `INSERT INTO portfolio_coords (id, size_id, type, x_coords, y_coords) 
               VALUES ($1, $2, $3, $4, $5)`,
              [id, i + 1, PORTFOLIO, xCoords, yCoords],
            ],
          }))
      ),
      (async () => {
        const res = await doAction(
          images.map(({ src }) => ({
            method: 'query',
            args: [
              `INSERT INTO portfolio_images (portfolio_id, src) VALUES ($1, $2) RETURNING *`,
              [id, src],
            ],
          }))
        );
        res.forEach(({ rows: [{ id }] }, i) => images[i].id = id);

        return await doAction(
          Array(3)
            .fill(null)
            .reduce((queries, v, i) => [
              ...queries,
              ...images.map(({ id, xCoords, yCoords }) => ({
                method: 'query',
                args: [
                  `INSERT INTO portfolio_coords (id, size_id, type, x_coords, y_coords) VALUES ($1, $2, $3, $4, $5)`,
                  [id, i + 1, PORTFOLIO_IMAGES, xCoords, yCoords],
                ],
              }))
            ], [])
        )
      })(),
    ]);
  }
}

module.exports = PortfolioSvc;
