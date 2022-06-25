const express = require('express');
const UsersController = require('../controllers/UsersController');
const UsersMiddleware = require('../middlewares/UsersMiddleware');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get(
  '/:id',
  (req, res, next) => AuthMiddleware.verifyToken(req, res, next),
  (req, res) => UsersController.getById(req, res),
);

router.post(
  '/',
  (req, res, next) => UsersMiddleware.verifyUsername(req, res, next),
  (req, res, next) => UsersMiddleware.verifyEmail(req, res, next),
  (req, res, next) => UsersMiddleware.verifyPassword(req, res, next),
  (req, res) => UsersController.create(req, res),
);

module.exports = router;
