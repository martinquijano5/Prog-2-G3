var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profileController');

/* GET home page. */

router.get('/edit', profileController.edit);

router.get('/login', profileController.login);

router.get('/register', profileController.register);

router.get('/:id', profileController.show);

//router.post('/profile', userController.profile); //procesa los datos recibidos en el form ???? que form?


module.exports = router;