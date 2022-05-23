//requires necesarios
const db = require('../database/models') //trae los modelos
const phones = db.Phone //de todos los modelos pide Phone(el alias)

let data = require('../db/index');
let funcionFillArray = require('../utils/fillArray');

//funciones
let arrayNovedades = funcionFillArray(4);
let arrayMasComentados = funcionFillArray(4);


const indexController = {
    home: function (req,res){
        phones.findAll () //corresponde a la variable qyue tiene adentro el modelo que obtuvimos de la ocnstante db, si tnego adentro el modelo podemos usar el metodo de sequelize que son promesas
              .then(function(celulares){
                //return res.send (celulares)
                 return res.render('index', {info: data, arrayNovedades: arrayNovedades, arrayMasComentados: arrayMasComentados});
            }) 
    },
    search: function (req,res){
        return res.render('search-results', {info: data});
    }   
}

//exportamos

module.exports = indexController;