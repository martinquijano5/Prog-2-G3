//requires necesarios
//const { Association } = require('sequelize/types');
const db = require('../database/models'); //trae los modelos
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
        //var usuarios = [];
        phones.findAll ({
            include:[{association: 'owner'}, {association: 'comentarios'}],
            where: [{model: {[op.like]: '%' + req.query.search + '%'}}] //  asi deberia funcionar 
        })
            .then(function (celulares){
                //return res.send(celulares);
                return res.render('search-results', {info: celulares, query: req.query.search});
                /*
                let fks = [];
                //return res.send (celulares) //esto lo use para ver si llegaba -> hasta aca anda
                //agarrar perfiles de los que postearon los celulares
                for(let i = 0; i < celulares.length; i++){
                    fks.push(celulares[i].FkUserId);
                }
                //return res.send(fks); -> llega [1,1,1,1]
                for(let i = 0; i < fks.length; i++){
                    users.findOne({
                        where: [{id: fks[i]}]
                    })
                    .then(function(usuarioPosteo){
                        usuarios.push({id: usuarioPosteo.id, username: usuarioPosteo.username, image: usuarioPosteo.image});
                        if(i == fks.length - 1){ //esto es para que se haga en la ultima vuelta del for
                            return res.render('search-results', {info: celulares, usuarios: usuarios, query: req.query.search});
                        }
                    })
                } forma de hacerlo sin relaciones del model*/
            })        
            .catch(error => console.log('EL ERROR ES: ' + error))
        }
}

//exportamos

module.exports = indexController;