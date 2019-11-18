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
  return db.runSql(`
    ALTER TABLE portfolio ADD COLUMN position SMALLINT;
  `).then(() => (
    db.runSql(`
        UPDATE portfolio SET position = id;
    `)
  )).then(() => (
    db.runSql(`
        ALTER TABLE portfolio ALTER COLUMN position SET NOT NULL;
    `)
  ));
};

exports.down = function (db) {
  return db.runSql(`
      ALTER TABLE portfolio DROP COLUMN position
  `);
};

exports._meta = {
  'version': 1,
};
