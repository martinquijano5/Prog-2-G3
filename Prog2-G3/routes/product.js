var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'));
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});


/* GET home page. */
router.get('/add', productController.add); // muestra el form
router.post('/store', upload.single('image'), productController.store); // procesa y almacena los datos en la db
router.post('/storeComment', productController.storeComment); 
router.get('/:id', productController.show);
router.get('/edit/:id', productController.edit); // muestra el form
router.post('/update/:id', upload.single('image'), productController.update); 
router.get('/delete/:id', productController.delete); 

module.exports = router;