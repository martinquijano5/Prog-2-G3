var express = require('express');
var router = express.Router();
const loginController = require('../controllers/productController');

/* GET home page. */
router.get('/', loginController.show);

module.exports = router;
