const express = require('express');
const TasksMiddleware = require('../middlewares/TasksMiddleware');
const TasksController = require('../controllers/TasksController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post(
  '/',
  (req, res, next) => AuthMiddleware.verifyToken(req, res, next),
  (req, res, next) => TasksMiddleware.verfifyTitle(req, res, next),
  (req, res, next) => TasksMiddleware.verifyStatus(req, res, next),
  (req, res) => TasksController.create(req, res),
);

module.exports = router;
