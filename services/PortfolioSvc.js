const path = require('path');
const doAction = require('./db');
const ImagesSvc = require('./ImagesSvc');

const { STATIC_FILES_DIRECTORY } = require(`${APP_PATH}/constants`);

class PortfolioSvc {
  static async getPortfolios({ page = 1, per = 200 } = {}) {
    const [{ rows }] = await doAction([
      {
        method: 'query',
        args: [
          `SELECT
            portfolio.*
          FROM portfolio
          ORDER BY position
          LIMIT $1 OFFSET $2;`,
          [per, page - 1],
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
            p.*,
            json_agg(
              json_build_object(
                'id', pis.id
              )
            ) AS sections
          FROM portfolio AS p
          LEFT JOIN portfolio_image_sections AS pis on p.id = pis.portfolio_id
          WHERE p.id = $1
          GROUP BY p.id`,
          [id]
        ],
      },
    ]);

    if (!portfolio) return null;
    portfolio.sections = portfolio.sections || [];

    if (portfolio.sections.length) {
      const [{ rows: sections }] = await doAction([
        {
          method: 'query',
          args: [
            `SELECT
              pis.*,
              json_agg(
                json_build_object(
                  'id', pi.id,
                  'src', pi.src
                )
              ) AS images
            FROM portfolio_image_sections AS pis
            JOIN portfolio_images AS pi on pis.id = pi.section_id
            WHERE pis.id = ANY($1::int[])
            GROUP BY pis.id`,
            [portfolio.sections.map(({ id }) => id)],
          ],
        },
      ]);

      portfolio.sections = sections;
    }

    return portfolio;
  }

  static async addPortfolio(data, id = null) {
    const {
      title,
      description,
      color,
      presentablePicture,
      mainPicture,
      sections,
    } = data;

    const [{ rows }] = await doAction([{
      method: 'query',
      args: [
        `SELECT MAX(position) AS position FROM portfolio`
      ]
    }]);

    const position = rows.length ? rows[0].position + 1 : 1;

    ([{ rows: [{ id }] }] = await doAction([{
      method: 'query',
      args: [
        `INSERT INTO portfolio (title, description, background_color, presentable_picture, main_picture, position${id ? ', id' : ''})
         VALUES ($1, $2, $3, $4, $5, $6${id ? ', $7' : ''}) RETURNING *`,
        [title, description, color, presentablePicture, mainPicture, position, ...(id ? [id] : [])],
      ],
    }]));

    const res = await doAction(
      sections.map(({ colsCount }) => ({
        method: 'query',
        args: [
          `INSERT INTO portfolio_image_sections (portfolio_id, cols_count) VALUES ($1, $2) RETURNING *`,
          [id, colsCount],
        ],
      }))
    );
    const images = [];

    res.forEach(({ rows: [{ id }] }, i) => {
      images.push(
        ...sections[i].images.map(({ src }) => ({
          id, src
        }))
      )
    });

    await doAction(
      images.map(({ id, src }) => ({
        method: 'query',
        args: [
          `INSERT INTO portfolio_images (section_id, src) VALUES ($1, $2)`,
          [id, src],
        ],
      }))
    );
  }

  static async deletePortfolio(id) {
    const [{ rows: deletedSections }, { rows: [deletedPortfolio] }] = await doAction([
      {
        method: 'query',
        args: [
          `DELETE FROM portfolio_image_sections WHERE portfolio_id = $1 RETURNING *`,
          [id],
        ],
      },
      {
        method: 'query',
        args: [
          `DELETE FROM portfolio WHERE id = $1 RETURNING *`,
          [id],
        ],
      },
    ]);

    if (deletedPortfolio) {
      const {
        main_picture: mainPicture,
        presentable_picture: presentablePicture,
      } = deletedPortfolio;

      ImagesSvc.deletePhoto(
        path.join(
          APP_PATH,
          path.resolve(STATIC_FILES_DIRECTORY),
          path.resolve(mainPicture),
        ),
      );
      ImagesSvc.deletePhoto(
        path.join(
          APP_PATH,
          path.resolve(STATIC_FILES_DIRECTORY),
          path.resolve(presentablePicture),
        ),
      );
    }

    if (Array.isArray(deletedSections) && deletedSections.length) {
      const sectionIds = deletedSections.map(({ id }) => id);
      const [{ rows: deletedImages }] = await doAction([
        {
          method: 'query',
          args: [
            `DELETE FROM portfolio_images WHERE section_id = ANY($1::int[]) RETURNING *`,
            [sectionIds],
          ],
        },
      ]);
      deletedImages.map(({ src }) => {
        ImagesSvc.deletePhoto(
          path.join(
            APP_PATH,
            path.resolve(STATIC_FILES_DIRECTORY),
            path.resolve(src),
          ),
        )
      });
    }
  }

  static changeOrder(portfolios) {
    return doAction(
      portfolios.map(({ id, position }) => ({
        method: 'query',
        args: [
          `UPDATE portfolio SET position = $2 WHERE id = $1`,
          [id, position],
        ],
      }))
    )
  }
}

module.exports = PortfolioSvc;
