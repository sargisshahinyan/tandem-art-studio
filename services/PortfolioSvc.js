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
          GROUP BY portfolio.id
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
          JOIN portfolio_image_sections AS pis on p.id = pis.portfolio_id
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
      presentablePicture,
      mainPicture,
      sections,
    } = data;

    ([{ rows: [{ id }] }] = await doAction([{
      method: 'query',
      args: [
        `INSERT INTO portfolio (title, description, presentable_picture, main_picture${id ? ', id' : ''})
         VALUES ($1, $2, $3, $4${id ? ', $5' : ''}) RETURNING *`,
        [title, description, presentablePicture, mainPicture, ...(id ? [id] : [])],
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
}

module.exports = PortfolioSvc;
