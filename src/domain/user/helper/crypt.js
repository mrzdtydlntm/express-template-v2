const bcrypt = require("bcryptjs");
const { cryptKit } = require("../../../../toolkit/config/env");

class Hash {
  static encrypt(password) {
    const salt = bcrypt.genSaltSync(cryptKit.saltSync);
    return bcrypt.hashSync(password, salt);
  }

  static compare(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

module.exports = Hash;
