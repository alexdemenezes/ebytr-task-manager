/* eslint-disable class-methods-use-this */
const HashGenerator = require('../utils/HashGenerator');
const User = require('../models/User');

class UsersService {
  async create(userData) {
    const { username, email, password } = userData;
    const user = await this.getByEmail(email);
    if (!user) {
      const generator = new HashGenerator(password);
      const hash = generator.passwordToHash();

      const result = await User.create({
        username,
        email,
        password: hash,
      });
      return {
        id: result.id,
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
