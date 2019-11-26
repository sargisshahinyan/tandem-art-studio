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
    UPDATE pages SET data='${
      JSON.stringify({
        mainBackground: '/img/services/main/main-background.png',
        secondaryBackground: '/img/services/main/secondary-background.png',
        slidePaths: [
          {
            main: {
              src: '/img/main/slide/slide-1.png',
              position: 'center',
            },
            text: {
              src: '/img/main/slide/slide-text-1.png',
              position: 'center',
            },
          },
          {
            main: {
              src: '/img/main/slide/slide-2.png',
              position: 'center',
            },
            text: {
              src: '/img/main/slide/slide-text-2.png',
              position: 'center',
            },
          },
          {
            main: {
              src: '/img/main/slide/slide-3.png',
              position: 'center',
            },
            text: {
              src: '/img/main/slide/slide-text-3.png',
              position: 'center',
            },
          },
          {
            main: {
              src: '/img/main/slide/slide-4.png',
              position: 'center',
            },
            text: {
              src: '/img/main/slide/slide-text-4.png',
              position: 'center',
            },
          },
          {
            main: {
              src: '/img/main/slide/slide-5.png',
              position: 'center',
            },
            text: {
              src: '/img/main/slide/slide-text-5.png',
              position: 'center',
            },
          },
        ]
      })
    }' WHERE path='/home'
  `);
};

exports.down = function (db) {
  return db.runSql(`
    UPDATE pages SET data='${
      JSON.stringify({
        mainBackground: '/img/services/main/main-background.png',
        secondaryBackground: '/img/services/main/secondary-background.png',
        slidePaths: [
          {
            main: '/img/main/slide/slide-1.png',
            text: '/img/main/slide/slide-text-1.png',
          },
          {
            main: '/img/main/slide/slide-2.png',
            text: '/img/main/slide/slide-text-2.png',
          },
          {
            main: '/img/main/slide/slide-3.png',
            text: '/img/main/slide/slide-text-3.png',
          },
          {
            main: '/img/main/slide/slide-4.png',
            text: '/img/main/slide/slide-text-4.png',
          },
          {
            main: '/img/main/slide/slide-5.png',
            text: '/img/main/slide/slide-text-5.png',
          }
        ]
      })
    }' WHERE path='/home'
  `);
};

exports._meta = {
  'version': 1,
};
