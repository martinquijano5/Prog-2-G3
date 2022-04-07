var express = require('express');
var router = express.Router();
const loginController = require('../controllers/searchResultsController');

/* GET home page. */
router.get('/', loginController.search);

module.exports = router;
