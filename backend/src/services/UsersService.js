/* eslint-disable class-methods-use-this */
const { compareSync } = require('bcryptjs');
const HashGenerator = require('../utils/HashGenerator');
const JwtGenerator = require('../utils/JwtGenerator');
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

  async login(emailLogin, password) {
    const user = await this.getByEmail(emailLogin);
    if (user && compareSync(password, user.password)) {
      const token = JwtGenerator.generateToken(emailLogin, password);
      const { id, username, email } = user;
      return {
        user: {
          id,
          username,
          email,
        },
        token,
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

  async getById(id) {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    return user;
  }
}

module.exports = new UsersService();
