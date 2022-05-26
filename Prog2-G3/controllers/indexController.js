//requires necesarios
const db = require('../database/models'); //trae los modelos
const { usuario } = require('../db/index');
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
            //where: [{model: {[op.like]: req.query.search}}] //  asi deberia funcionar 
            where: [{model: {[op.like]: "%iphone%"}}] //solucionar hardcodeo
            //where: [{model: req.query.search}]
        })
            .then(function (celulares){
                let usuarios = [];
                let fks = [];
                return res.send (celulares) //esto lo use para ver si llegaba -> hasta aca anda
                //agarrar perfiles de los que postearon los celulares
                for(let i = 0; i < celulares.length; i++){
                    fks.push(celulares[i].FkUserId);
                }
                //return res.send(fks) // hasta aca anda
                for(let i = 0; i < fks.length; i++){
                    users.findOne({
                        where: [{id: fks[i]}]
                    })
                    .then(function(usuarioPosteo){
                        usuarios.push({id: usuarioPosteo.id, username: usuarioPosteo.username, image: usuarioPosteo.image});
                        //return res.send(usuarios); // muestra solo el primer usuario
                        console.log('EL USUARIO ES: ' + usuarioPosteo.username + i); // si vemos la consola vemos que el array lo recorre
                    })
                }
                //return res.send(usuarios); // aca no llegan los usuarios -> scope del then??
                //return res.render('search-results', {info: celulares, usuarios: usuarios, query: req.query.search});
            })        
            .catch(error => console.log('EL ERROR ES: ' + error))
        }
}


//exportamos

module.exports = indexController;