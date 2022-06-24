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
}
module.exports = new UsersController();
