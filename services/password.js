// import { scrypt, randomBytes } from 'crypto';
// import { promisify } from 'util';

var crypto = require('crypto');
var util = require('util');
const scryptAsync = util.promisify(crypto.scrypt);

class Password {
  static async toHash(password) {
    const salt = crypto.randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64));

    return `${buf.toString('hex')}.${salt}`;
  }
}

module.exports = Password
