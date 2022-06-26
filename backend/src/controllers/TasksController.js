const TasksService = require('../services/TasksService');

class TasksController {
  async create(req, res) {
    try {
      const { email } = req.body.decoded;
      const { title, description, status } = req.body;
      const newTask = await TasksService.create({ title, description, status }, email);
      return res.status(201).json(newTask);
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }
}

module.exports = new TasksController();
