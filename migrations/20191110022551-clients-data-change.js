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
        title: "Our Clients are our priority",
        description: "Innovation is born from collaboration and diverse perspectives. We exist to serve organizations that are making a positive social impact. We bring teams of creative and technical talent together to help our clients achieve their mission. We work to ensure that every project reflects our client’s individual needs, vision, and unique identity combined with our marketing and creative guidance.Every project begins with understanding the goal. We guide you through each step of our process while meeting deadlines and challenges set forth to accomplish these goals. Ultimately your success is our success. We believe that great design and effective communication are key ingredients for improving our lives and the world around us.",
        clients: [
          {
            icon: "/img/clients/client-1.png",
            order: 1,
          },
          {
            icon: "/img/clients/client-2.png",
            order: 2,
          },
          {
            icon: "/img/clients/client-3.png",
            order: 3,
          },
          {
            icon: "/img/clients/client-4.png",
            order: 4,
          },
          {
            icon: "/img/clients/client-5.png",
            order: 5,
          },
          {
            icon: "/img/clients/client-6.png",
            order: 6,
          },
          {
            icon: "/img/clients/client-7.png",
            order: 7,
          },
          {
            icon: "/img/clients/client-8.png",
            order: 8,
          },
          {
            icon: "/img/clients/client-9.png",
            order: 9,
          },
          {
            icon: "/img/clients/client-10.png",
            order: 10,
          },
          {
            icon: "/img/clients/client-11.png",
            order: 11,
          },
          {
            icon: "/img/clients/client-12.png",
            order: 12,
          },
          {
            icon: "/img/clients/client-13.png",
            order: 13,
          },
          {
            icon: "/img/clients/client-14.png",
            order: 14,
          },
          {
            icon: "/img/clients/client-15.png",
            order: 15,
          },
          {
            icon: "/img/clients/client-16.png",
            order: 16,
          },
          {
            icon: "/img/clients/client-17.png",
            order: 17,
          },
          {
            icon: "/img/clients/client-18.png",
            order: 18,
          },
          {
            icon: "/img/clients/client-19.png",
            order: 19,
          },
          {
            icon: "/img/clients/client-20.png",
            order: 20,
          },
          {
            icon: "/img/clients/client-21.png",
            order: 21,
          },
          {
            icon: "/img/clients/client-22.png",
            order: 22,
          },
          {
            icon: "/img/clients/client-23.png",
            order: 23,
          },
          {
            icon: "/img/clients/client-24.png",
            order: 24,
          },
          {
            icon: "/img/clients/client-25.png",
            order: 25,
          },
          {
            icon: "/img/clients/client-26.png",
            order: 26,
          },
          {
            icon: "/img/clients/client-27.png",
            order: 27,
          },
          {
            icon: "/img/clients/client-28.png",
            order: 28,
          },
          {
            icon: "/img/clients/client-29.png",
            order: 29,
          },
          {
            icon: "/img/clients/client-30.png",
            order: 30,
          },
          {
            icon: "/img/clients/client-31.png",
            order: 31,
          },
          {
            icon: "/img/clients/client-32.png",
            order: 32,
          },
          {
            icon: "/img/clients/client-33.png",
            order: 33,
          },
        ]
      })
    }' WHERE path='/clients'
  `);
};

exports.down = function (db) {
  return db.runSql(`
    UPDATE pages SET data='${
      JSON.stringify({
        mainBackground: "/img/services/main/main-background.png",
        secondaryBackground: "/img/services/main/secondary-background.png",
        title: "Our Clients are our priority",
        description: "Innovation is born from collaboration and diverse perspectives. We exist to serve organizations that are making a positive social impact. We bring teams of creative and technical talent together to help our clients achieve their mission. We work to ensure that every project reflects our client’s individual needs, vision, and unique identity combined with our marketing and creative guidance.Every project begins with understanding the goal. We guide you through each step of our process while meeting deadlines and challenges set forth to accomplish these goals. Ultimately your success is our success. We believe that great design and effective communication are key ingredients for improving our lives and the world around us.",
        clients: [
          {
            icon: "/img/clients/client-1.png",
          },
          {
            icon: "/img/clients/client-2.png",
          },
          {
            icon: "/img/clients/client-3.png",
          },
          {
            icon: "/img/clients/client-4.png",
          },
          {
            icon: "/img/clients/client-5.png",
          },
          {
            icon: "/img/clients/client-6.png",
          },
          {
            icon: "/img/clients/client-7.png",
          },
          {
            icon: "/img/clients/client-8.png",
          },
          {
            icon: "/img/clients/client-9.png",
          },
          {
            icon: "/img/clients/client-10.png",
          },
          {
            icon: "/img/clients/client-11.png",
          },
          {
            icon: "/img/clients/client-12.png",
          },
          {
            icon: "/img/clients/client-13.png",
          },
          {
            icon: "/img/clients/client-14.png",
          },
          {
            icon: "/img/clients/client-15.png",
          },
          {
            icon: "/img/clients/client-16.png",
          },
          {
            icon: "/img/clients/client-17.png",
          },
          {
            icon: "/img/clients/client-18.png",
          },
          {
            icon: "/img/clients/client-19.png",
          },
          {
            icon: "/img/clients/client-20.png",
          },
          {
            icon: "/img/clients/client-21.png",
          },
          {
            icon: "/img/clients/client-22.png",
          },
          {
            icon: "/img/clients/client-23.png",
          },
          {
            icon: "/img/clients/client-24.png",
          },
          {
            icon: "/img/clients/client-25.png",
          },
          {
            icon: "/img/clients/client-26.png",
          },
          {
            icon: "/img/clients/client-27.png",
          }
        ]
      })
    }' WHERE path='/clients'
  `);
};

exports._meta = {
  'version': 1,
};
