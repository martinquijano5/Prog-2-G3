var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profileController');

/* GET home page. */
router.get('/', profileController.show);

module.exports = router;
