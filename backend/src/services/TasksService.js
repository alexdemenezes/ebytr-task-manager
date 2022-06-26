const Task = require('../models/Task');
const UsersService = require('./UsersService');

class TasksService {
  async create(task, email) {
    const { title, description, status } = task;
    const user = await UsersService.getByEmail(email);
    const newTask = await Task.create({
      title,
      description,
      status,
      userId: user.id,
    });

    return {
      id: newTask.id,
      title,
      description,
      status,
      userId: user.id,
    };
  }
}

module.exports = new TasksService();
