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

  async getAll(req, res) {
    try {
      const { email } = req.body.decoded;
      const tasks = await TasksService.getAll(email);
      return res.status(200).json(tasks);
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const task = await TasksService.getById(+id);

      if (task) {
        return res.status(200).json(task);
      }
      return res.status(404).json({ message: 'user not found' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }
}

module.exports = new TasksController();
