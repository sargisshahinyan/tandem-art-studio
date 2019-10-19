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
      ALTER TABLE portfolio ADD COLUMN rows_count SMALLINT NOT NULL DEFAULT 10;
      ALTER TABLE portfolio ADD COLUMN columns_count SMALLINT NOT NULL DEFAULT 10;
      ALTER TABLE portfolio_coords RENAME portfolio_id TO id;
      ALTER TABLE portfolio ADD COLUMN row_height VARCHAR(25) NOT NULL DEFAULT '50px';
      ALTER TABLE portfolio_coords DROP COLUMN row_height;
    `)
  );
};

exports.down = function (db) {
  return (
    db.runSql(`
      ALTER TABLE portfolio DROP COLUMN rows_count;
      ALTER TABLE portfolio DROP COLUMN columns_count;
      ALTER TABLE portfolio_coords RENAME id TO portfolio_id;
      ALTER TABLE portfolio DROP COLUMN row_height;
      ALTER TABLE portfolio_coords ADD COLUMN row_height VARCHAR(25) NOT NULL DEFAULT '50px';
    `)
  );
};

exports._meta = {
  "version": 1,
};
