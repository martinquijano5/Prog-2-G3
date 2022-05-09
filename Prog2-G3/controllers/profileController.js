//requires necesarios
let data = require('../db/index');

//funciones

const profileController = {
    show: function (req,res){
        return res.render('profile', {info: data});
    },
    edit: function (req,res){
        return res.render('profile-edit', {info: data});
    }
}

//exportamos
module.exports = profileController;



