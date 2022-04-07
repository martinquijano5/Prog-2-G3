var express = require('express');
var router = express.Router();
const loginController = require('../controllers/profileEditController');

/* GET home page. */
router.get('/', loginController.edit);

module.exports = router;
