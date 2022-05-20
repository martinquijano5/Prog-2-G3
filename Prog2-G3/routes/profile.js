var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profileController');

/* GET home page. */
router.get('/', profileController.show);
router.get('/edit', profileController.edit);
router.get('/login', profileController.login);
router.get('/', profileController.register);



module.exports = router;
