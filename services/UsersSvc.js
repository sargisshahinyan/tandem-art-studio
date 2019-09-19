const randToken = require('rand-token');
const doAction = require('./db');

const EncryptionSvc = require('./EncryptionSvc');

const { ACCESS_TOKEN, REFRESH_TOKEN } = require(`${APP_PATH}/constants/tokenTypes`);

class UsersSvc {
  static get ACCESS_TOKEN_EXP_DATE() {
    const expDate = new Date;
    expDate.setSeconds(expDate.getSeconds() + 60);

    return expDate.toISOString();
  }
  static get REFRESH_TOKEN_EXP_DATE() {
    const expDate = new Date;
    expDate.setDate(expDate.getDate() + 60);

    return expDate.toISOString();
  }

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

  static async generateAdminToken(user) {
    const header = {
      "typ": "JWT"
    };
    const payload = {
      "iss": user.id,
      "access_token": {
        "token": randToken.generate(64),
        "expDate": this.ACCESS_TOKEN_EXP_DATE,
      },
      "refresh_token": {
        "token": randToken.generate(64),
        "expDate": this.REFRESH_TOKEN_EXP_DATE,
      },
    };

    await doAction([
      {
        method: 'query',
        args: [
          `INSERT INTO admin_tokens (admin_id, token, exp_date, type) 
           VALUES ($1, $2, $3, $4), ($5, $6, $7, $8)`,
          [
            user.id, payload.access_token.token, payload.access_token.expDate, ACCESS_TOKEN,
            user.id, payload.refresh_token.token, payload.refresh_token.expDate, REFRESH_TOKEN,
          ],
        ],
      }
    ]);

    return EncryptionSvc.createJWT(header, payload);
  }

  validateAdmin() {

  }
}

module.exports = UsersSvc;
