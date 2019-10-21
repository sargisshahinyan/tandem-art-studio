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
          WHERE portfolio_coords.type = $3
          GROUP BY portfolio.id
          LIMIT $1 OFFSET $2;`,
          [per, page - 1, PORTFOLIO],
        ],
      },
    ]);

    return rows;
  }

  static async getPortfolio(id) {
    const [{ rows: [portfolio] }] = await doAction([
      {
        method: 'query',
        args: [
          `SELECT
            portfolio.*,
            json_agg(
              json_build_object(
                'id', portfolio_images.id,
                'src', portfolio_images.src
              )
            ) AS images
          FROM portfolio
          JOIN portfolio_images ON portfolio.id = portfolio_images.portfolio_id
          WHERE portfolio.id = $1
          GROUP BY portfolio.id`,
          [id]
        ],
      },
    ]);

    if (!portfolio) return null;

    if (portfolio.images.length) {
      portfolio.images.forEach((image) => {
        image.coords = [];
      });

      const [{ rows: coords }] = await doAction([
        {
          method: 'query',
          args: [
            `SELECT
              portfolio_images.id,
              json_agg(
                json_build_object(
                  'name', sizes.name,
                  'starts_from', sizes.starts_from,
                  'x_coords', portfolio_coords.x_coords,
                  'y_coords', portfolio_coords.y_coords
                )
              ) AS coords
            FROM portfolio_images
            JOIN portfolio_coords ON portfolio_images.id = portfolio_coords.id
            JOIN sizes ON sizes.id = portfolio_coords.size_id
            WHERE portfolio_images.id = ANY ($1::int[])
            AND portfolio_coords.type = $2
            GROUP BY portfolio_images.id`,
            [portfolio.images.map(({ id }) => id), PORTFOLIO_IMAGES]
          ],
        },
      ]);

      if (Array.isArray(coords)) {
        coords.forEach(({ id, coords }) => {
          const image = portfolio.images.find(({ id: imageId }) => imageId === id);
          if (image) image.coords = coords;
        });
      }
    }

    return portfolio;
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
