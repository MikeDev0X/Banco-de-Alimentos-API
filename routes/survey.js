const express = require('express');
const router = express.Router();
const loginController = require('../controller/surveyController');
//const middleware = require('../middleware/jwt-middleware');

router.post('/login', loginController.login);

module.exports = router;