/* eslint-disable class-methods-use-this */
const UsersService = require('../services/UsersService');

class UsersController {
  async create(req, res) {
    try {
      const newUser = await UsersService.create(req.body);
      if (newUser) {
        return res.status(201).json(newUser);
      }
      return res.status(409).json({ message: 'email already used' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const loginData = await UsersService.login(email, password);
      if (loginData) {
        return res.status(200).json(loginData);
      }
      return res.status(401).json({ message: 'Incorrect email or password' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }
}
module.exports = new UsersController();
