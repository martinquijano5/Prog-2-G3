//requires necesarios
let data = require('../db/index');
//funciones

const indexController = {
    home: function (req,res){
        return res.render('index', {info: data});
    }
}


//exportamos

module.exports = indexController;