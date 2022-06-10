var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.home);
router.get('/search', indexController.search);
router.post('comentario', indexController.storeComment)

module.exports = router;