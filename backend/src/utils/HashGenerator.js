const bcrypt = require('bcryptjs');

class HashGenerator {
  constructor(saltNumber, password) {
    this.saltNumber = saltNumber;
    this.password = password;
  }

  passwordToHash() {
    const salt = bcrypt.genSaltSync(this.saltNumber);
    const hash = bcrypt.hashSync(this.password, salt);
    return hash;
  }
}

module.exports = HashGenerator;
