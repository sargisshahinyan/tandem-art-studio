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
}

module.exports = EncryptionSvc;
