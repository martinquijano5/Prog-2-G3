//requires necesarios
let data = require('../db/index');

//funciones

const profileEditController = {
    edit: function (req,res){
        return res.render('profile-edit', {info: data});
    }
}

//exportamos
module.exports = profileEditController;