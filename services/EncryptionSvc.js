const crypto = require('crypto');
const SECRET = process.env.SHA_SECRET || '1234567890';
const ALGORITHM = 'sha256';

class EncryptionSvc {
  static createHash(text) {
    return crypto.createHash(ALGORITHM).update(text).digest('hex');
  }

  static cryptText(text) {
    return (
      crypto
        .createHmac(ALGORITHM, SECRET)
        .update(text)
        .digest('hex')
    );
  }

  static base64Encode(text) {
    return Buffer.from(text).toString('base64');
  }

  static base64Decode(text) {
    return Buffer.from(text, 'base64').toString('ascii')
  }

  static createJWT(header, payload) {
    const encodedHeader = this.base64Encode(JSON.stringify(header));
    const encodedPayload = this.base64Encode(JSON.stringify(payload));

    const signature = this.cryptText(`${encodedHeader}.${encodedPayload}`);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  static validateJWT(token) {
    const [header = '', payload = '', signature = ''] = token.split('.');

    if (signature !== this.cryptText(`${header}.${payload}`)) {
      return null;
    }

    return {
      header: JSON.parse(this.base64Decode(header)),
      payload: JSON.parse(this.base64Decode(payload)),
    };
  }
}

module.exports = EncryptionSvc;
