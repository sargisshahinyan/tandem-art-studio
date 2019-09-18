const doAction = require('./db');

const EncryptionSvc = require('./EncryptionSvc');

class UsersSvc {
  static get ADMIN_TABLE() {
    return 'admins';
  }

  static async adminExists() {
    const [{ rows: [{ count }] }] = await doAction([
      {
        method: 'query',
        args: [`SELECT COUNT(*) AS count FROM ${this.ADMIN_TABLE}`],
      }
    ]);

    return Boolean(parseInt(count, 10));
  }

  static async addAdmin({ name, username, password }) {
    password = EncryptionSvc.cryptText(password);

    const [{ rowCount }] = await doAction([
      {
        method: 'query',
        args: [`SELECT id FROM ${this.ADMIN_TABLE} WHERE username = $1`, [username]],
      }
    ]);

    if (rowCount) throw new Error(`User with username ${username} exists`);

    await doAction([
      {
        method: 'query',
        args: [
          `INSERT INTO ${this.ADMIN_TABLE} ("name", "username", "password") VALUES ($1, $2, $3)`,
          [name, username, password]
        ],
      }
    ]);
  }
}

module.exports = UsersSvc;
