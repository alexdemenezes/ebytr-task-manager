/* eslint-disable class-methods-use-this */
const HashGenerator = require('../utils/HashGenerator');
const User = require('../models/User');

class UsersService {
  async create(userData) {
    const { username, email, password } = userData;
    const user = this.getUserByEmail(email);
    if (!user) {
      const generator = new HashGenerator(password, 10);
      const hash = generator.passwordToHash();
      const [{ insertId }] = await User.create({
        username,
        password: hash,
        email,
      });
      return {
        id: insertId,
        username,
        email,
      };
    }
    return null;
  }

  async getByEmail(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

module.exports = new UsersService();
