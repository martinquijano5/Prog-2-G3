var express = require('express');
var router = express.Router();
const registerController = require('../controllers/registerController');

/* GET home page. */
router.get('/', registerController.register);

module.exports = router;
