var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/add', productController.add); // muestra el form
router.post('/store', productController.store); // procesa y almacena los datos en la db
router.get('/:id', productController.show);


module.exports = router;