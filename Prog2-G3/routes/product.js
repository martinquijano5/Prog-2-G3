var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/add', productController.add);
router.get('/:id', productController.show);

module.exports = router;
