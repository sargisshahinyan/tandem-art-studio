'use strict';

let [dbm, type, seed] = Array(3).fill(null);

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return (
    db.runSql(`
      DROP TABLE IF EXISTS portfolio_coords;
      DROP TABLE IF EXISTS sizes;
      ALTER TABLE portfolio DROP COLUMN rows_count;
      ALTER TABLE portfolio DROP COLUMN columns_count;
      ALTER TABLE portfolio DROP COLUMN row_height;
      CREATE TABLE IF NOT EXISTS portfolio_image_sections (
        id SERIAL NOT NULL PRIMARY KEY,
        portfolio_id INT NOT NULL,
        cols_count SMALLINT NOT NULL
      );
      ALTER TABLE portfolio_images RENAME portfolio_id TO section_id;
      UPDATE pages SET data = '{}' WHERE path='/portfolio';
    `)
  );
};

exports.down = function (db) {
  return (
    db.runSql(`
      CREATE TABLE IF NOT EXISTS portfolio_coords (
        id INT NOT NULL,
        size_id INT NOT NULL,
        type VARCHAR(14) NOT NULL,
        x_coords VARCHAR(11) DEFAULT '10-10'::CHARACTER VARYING NOT NULL,
        y_coords VARCHAR(11) DEFAULT '10-10'::CHARACTER VARYING NOT NULL,
        CONSTRAINT portfolio_coords_pkey PRIMARY KEY (id, size_id, type)
      );
      CREATE TABLE IF NOT EXISTS sizes (
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(10) NOT NULL,
        starts_from SMALLINT NOT NULL
      );
      ALTER TABLE portfolio ADD COLUMN rows_count SMALLINT NOT NULL DEFAULT 10;
      ALTER TABLE portfolio ADD COLUMN columns_count SMALLINT NOT NULL DEFAULT 10;
      ALTER TABLE portfolio ADD COLUMN row_height VARCHAR(25) NOT NULL DEFAULT '50px';
      DROP TABLE IF EXISTS portfolio_coords;
      ALTER TABLE portfolio_images RENAME section_id TO portfolio_id;
      UPDATE pages SET data = '${JSON.stringify({
        '1': {
          rows_count: 10,
          columns_count: 10,
          row_height: '50px',
        },
        '2': {
          rows_count: 10,
          columns_count: 10,
          row_height: '50px',
        },
        '3': {
          rows_count: 10,
          columns_count: 10,
          row_height: '50px',
        },
      })}' WHERE path='/portfolio';
    `)
  );
};

exports._meta = {
  "version": 1,
};
