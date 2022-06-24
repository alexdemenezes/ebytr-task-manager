const express = require('express');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

router.post('/', (req, res) => UsersController.create(req, res));

module.exports = router;
