//requires necesarios
const db = require('../database/models') //trae los modelos
const phones = db.Phone //de todos los modelos pide Phone(el alias)
const users = db.User // de todos los modelos pide User(el alias)
const op = db.Sequelize.Op;//contiene los operadores para usar en metodos de sequelize

const data = require('../db/index')

let funcionFillArray = require('../utils/fillArray');

//funciones
let arrayNovedades = funcionFillArray(4);
let arrayMasComentados = funcionFillArray(4);


const indexController = {
    home: function (req,res){
        phones.findAll () //corresponde a la variable qyue tiene adentro el modelo que obtuvimos de la ocnstante db, si tnego adentro el modelo podemos usar el metodo de sequelize que son promesas
              .then(function(celulares){
                //console.log('RESULTADOS DEL FINDALL: ' + celulares);
                //return res.send (celulares)
                return res.render('index', {info: data, arrayNovedades: arrayNovedades, arrayMasComentados: arrayMasComentados});
            }) 
    },
    search: function (req,res){
        phones.findAll ({
            where: [{model: {[op.like]: '%iPhone%'}}]//solucionar hardcodeo 
        })
            .then(function (celulares){
                //return res.send (celulares) //esto lo use para ver si llegaba\
                //agarrar perfiles de los que postearon los celulares
                let usuarios = [];
                for(let i = 0; i < celulares.length; i++){
                    users.findOne({
                        where: [{id: celulares[i].FkUserId}]
                    })
                    .then(function(usuarioPosteo){
                        usuarios.push(usuarioPosteo);
                        return res.render('search-results', {info: celulares, usuarios: usuarios, query: req.query.search});

                    })
                }
            })

            .catch(error => console.log('EL ERROR ES: ' + error))
    }   
}


//exportamos

module.exports = indexController;