//requires necesarios
let data = require('../db/index');
let funcionFillArray = require('../utils/fillArray');

//funciones
let arrayNovedades = funcionFillArray(4);
let arrayMasComentados = funcionFillArray(4);


const indexController = {
    home: function (req,res){
        return res.render('index', {info: data, arrayNovedades: arrayNovedades, arrayMasComentados: arrayMasComentados});
    }
}


//exportamos

module.exports = indexController;