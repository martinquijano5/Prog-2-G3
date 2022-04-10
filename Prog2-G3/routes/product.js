var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/', productController.show);
router.get('/add', productController.add);

module.exports = router;
