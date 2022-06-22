var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profileController');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

/* GET home page. */


router.get('/login', profileController.login);
router.post('/login', profileController.signIn);
router.post('/profile', upload.single('image') ,  profileController.editProfile);
router.post('/logout', profileController.logout);

router.get('/register', profileController.register);

router.post('/storeProfile', upload.single('image') , profileController.storeProfile); // procesa y almacena los datos en la db

router.post('/storeFollower', profileController.storeFollower);

router.get('/profile-edit/:id', profileController.edit);

router.get('/:id', profileController.show);

//router.post('/profile', userController.profile); //procesa los datos recibidos en el form ???? que form?


module.exports = router;