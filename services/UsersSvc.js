const doAction = require('./db');

const EncryptionSvc = require('./EncryptionSvc');

class UsersSvc {
  static get ADMIN_TABLE() {
    return 'admins';
  }

  static async adminExists() {
    const [{ rows: [{ count }] }] = await doAction({
      query: [`SELECT COUNT(*) AS count FROM ${this.ADMIN_TABLE}`],
    });

    return Boolean(parseInt(count, 10));
  }

  static async addAdmin({ name, username, password }) {
    password = EncryptionSvc.cryptText(password);

    await doAction({
      query: [
        `INSERT INTO ${this.ADMIN_TABLE} ("name", "username", "password") VALUES ($1, $2, $3)`,
        [name, username, password]
      ],
    });
  }
}

module.exports = UsersSvc;
