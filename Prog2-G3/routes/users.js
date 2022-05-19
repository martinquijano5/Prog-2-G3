var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', userController.create); //muestra el form de regustro
router.post('/profile', userController.profile); //procesa los datos recibidos en el form
module.exports = router;

