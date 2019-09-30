'use strict';

let dbm, type, seed;

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
        DROP TABLE IF EXISTS admin_tokens;
      `)
      .then(() => (
        db.runSql(`
          CREATE TABLE admin_tokens (
            admin_id INT NOT NULL,
            token VARCHAR(64) NOT NULL,
            exp_date TIMESTAMPTZ NOT NULL,
            type VARCHAR(10) NOT NULL
          );
        `)
      ))
      .then(() => (
        db.runSql(`
          CREATE INDEX IF NOT EXISTS admin_id_idx ON admin_tokens(admin_id)
        `)
      ))
      .then(() => (
        db.runSql(`
          CREATE INDEX IF NOT EXISTS token_type_idx ON admin_tokens(token, type)
        `)
      ))
    );
};

exports.down = function (db) {
  return db.runSql(`
    DROP TABLE IF EXISTS admin_tokens;
  `);
};

exports._meta = {
  "version": 1,
};
