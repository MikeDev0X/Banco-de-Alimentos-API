const express = require('express');
const router = express.Router();
const signUpController = require('../controller/signUpController.js');

router.post('/signUp', signUpController.insertUsuario);
router.get('/getUsers', signUpController.getUsuarios);
router.get('/getIdUsuario/:idU', signUpController.getIdUsuario);


module.exports = router;