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
      items: [
        {
          type: 'video',
          content: '/img/gallery/gallery-video-1.mp4',
        },
        {
          type: 'picture',
          content: '/img/gallery/gallery-img-1.jpg',
        },
        {
          type: 'picture',
          content: '/img/gallery/gallery-img-2.jpg',
        },
        {
          type: 'picture',
          content: '/img/gallery/gallery-img-3.jpg',
        },
      ]
    })
  }' WHERE path='/gallery'
  `);
};

exports.down = function (db) {
  return db.runSql(`
    UPDATE pages SET data='${
    JSON.stringify({
      mainBackground: '/img/services/main/main-background.png',
      secondaryBackground: '/img/services/main/secondary-background.png',
      items: [],
    })
  }' WHERE path='/gallery'
  `);
};

exports._meta = {
  'version': 1,
};
