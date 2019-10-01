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
    db
      .runSql(`
        ALTER TABLE portfolio DROP COLUMN x_coords;
        ALTER TABLE portfolio DROP COLUMN y_coords;
        ALTER TABLE portfolio DROP COLUMN row_height;
        ALTER TABLE portfolio_images DROP COLUMN x_coords;
        ALTER TABLE portfolio_images DROP COLUMN y_coords;
      `)
      .then(() => (
        db.runSql(`
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
          })}' WHERE path='/portfolio'
        `)
      ))
      .then(() => (
        db.runSql(`
          CREATE TABLE portfolio_coords (
            portfolio_id INT NOT NULL,
            size_id INT NOT NULL,
            type VARCHAR(14) NOT NULL,
            x_coords VARCHAR(11) NOT NULL DEFAULT '10-10',
            y_coords VARCHAR(11) NOT NULL DEFAULT '10-10',
            row_height VARCHAR(25) NOT NULL DEFAULT '50px',
            PRIMARY KEY (portfolio_id, size_id, type)
          )
        `)
      ))
  );
};

exports.down = function (db) {
  return (
    db
      .runSql(`
        ALTER TABLE portfolio ADD COLUMN x_coords VARCHAR(11) NOT NULL DEFAULT '10-10';
        ALTER TABLE portfolio ADD COLUMN y_coords VARCHAR(11) NOT NULL DEFAULT '10-10';
        ALTER TABLE portfolio ADD COLUMN row_height VARCHAR(25) NOT NULL DEFAULT '50px';
        ALTER TABLE portfolio_images ADD COLUMN x_coords VARCHAR(11) NOT NULL DEFAULT '10-10';
        ALTER TABLE portfolio_images ADD COLUMN y_coords VARCHAR(11) NOT NULL DEFAULT '10-10';
      `)
      .then(() => (
        db.runSql(`
          DROP TABLE portfolio_coords;
        `)
      ))
  );
};

exports._meta = {
  "version": 1,
};
