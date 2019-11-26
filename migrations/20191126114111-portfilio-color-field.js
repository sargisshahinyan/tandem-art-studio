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
      ALTER TABLE portfolio ADD COLUMN background_color VARCHAR(7) DEFAULT '#000000';
    `)
  );
};

exports.down = function (db) {
  return db.runSql(`
      ALTER TABLE portfolio DROP COLUMN background_color;
  `);
};

exports._meta = {
  version: 1,
};
