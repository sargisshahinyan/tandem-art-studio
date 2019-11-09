const randToken = require('rand-token');
const doAction = require('./db');

const EncryptionSvc = require('./EncryptionSvc');

const { ACCESS_TOKEN, REFRESH_TOKEN } = require(`${APP_PATH}/constants/tokenTypes`);

class UsersSvc {
  static get ACCESS_TOKEN_EXP_DATE() {
    const expDate = new Date;
    expDate.setMinutes(expDate.getMinutes() + 30);

    return expDate.toISOString();
  }
  static get REFRESH_TOKEN_EXP_DATE() {
    const expDate = new Date;
    expDate.setDate(expDate.getDate() + 30);

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

  static async validateAdmin(token) {
    const result = EncryptionSvc.validateJWT(token);
    const err = Promise.reject({
      message: 'Invalid token',
    });

    if (!result) return err;

    const { payload } = result;
    const { iss, access_token } = payload;

    const [{ rows }] = await doAction([{
      method: 'query',
      args: [
        'SELECT admin_id AS id FROM admin_tokens WHERE token = $1 AND type = $2',
        [access_token.token, ACCESS_TOKEN]
      ]
    }]);

    if (!rows.length) return err;

    const [{ id }] = rows;

    if (Number(iss) !== Number(id)) return err;

    return payload;
  }

  static async updateTokens(id, accessToken, refreshToken) {
    const err = Promise.reject({
      message: 'Invalid token',
    });

    if (new Date(refreshToken.expDate) < new Date()) return err;

    const [{ rows }] = await doAction([{
      method: 'query',
      args: [
        'SELECT exp_date FROM admin_tokens WHERE token = $1 AND type = $2 AND admin_id = $3',
        [refreshToken.token, REFRESH_TOKEN, id]
      ]
    }]);

    if (!rows.length) return err;

    const [{ exp_date }] = rows;

    if (new Date(exp_date) < Date.now()) return err;

    await this.removeTokens(id, accessToken, refreshToken);

    return await this.generateAdminToken({ id });
  }

  static async authAdmin({ username, password }) {
    password = EncryptionSvc.cryptText(password);

    const [{ rows, rowCount }] = await doAction([
      {
        method: 'query',
        args: [
          `SELECT id, name, username, password FROM ${this.ADMIN_TABLE} WHERE username = $1`,
          [username]
        ]
      }
    ]);

    if (!rowCount) return Promise.reject({ message: 'There is no user with such username' });

    const [user] = rows;

    if (user.password !== password) return Promise.reject({ message: `Wrong password for username ${username}` });

    return user;
  }

  static removeTokens(id, accessToken, refreshToken) {
    return doAction([
      {
        method: 'query',
        args: [
          'DELETE FROM admin_tokens WHERE token = $1 AND type = $2 AND admin_id = $3',
          [refreshToken.token, REFRESH_TOKEN, id]
        ]
      },
      {
        method: 'query',
        args: [
          'DELETE FROM admin_tokens WHERE token = $1 AND type = $2 AND admin_id = $3',
          [accessToken.token, ACCESS_TOKEN, id]
        ]
      }
    ]);
  }
}

module.exports = UsersSvc;
