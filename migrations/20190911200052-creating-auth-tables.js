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
    CREATE TABLE admins (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(64) NOT NULL
    );
  `);
};

exports.down = function (db) {
  return db.runSql(`
    DROP TABLE admins;
  `);
};

exports._meta = {
  "version": 1,
};
