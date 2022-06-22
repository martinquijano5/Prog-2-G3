//requires necesarios
//const { Association } = require('sequelize/types');
const db = require('../database/models'); //trae los modelos
const phones = db.Phone //de todos los modelos pide Phone(el alias)
const users = db.User // de todos los modelos pide User(el alias)
const comments = db.Comment
const op = db.Sequelize.Op;//contiene los operadores para usar en metodos de sequelize

const data = require('../db/index')

let funcionFillArray = require('../utils/fillArray');


//funciones
let arrayNovedades = funcionFillArray(4);
let arrayMasComentados = funcionFillArray(4);

const indexController = {
    home: function (req,res){
        phones.findAll ({
            include:[{association: 'owner'}, {association: 'comentarios'}],
            order : [['createdAt', 'DESC']],
            limit: 4
        }) //corresponde a la variable qyue tiene adentro el modelo que obtuvimos de la ocnstante db, si tnego adentro el modelo podemos usar el metodo de sequelize que son promesas
            .then(function(celulares){
                phones.findAll ({
                    include:[{association: 'owner'}, {association: 'comentarios'}],
                    order : [['promedioRating', 'DESC']],
                    limit: 4
                })
                .then(function(celulares2){
                    for(let i = 0; i < celulares2.length; i++){
                        celulares.push(celulares2[i])//lo pusheamos en un for porque si pusheamos de una celulares2, queda todo celulares2 en una posicion de celulares, y yo quiero que quede en varias posiciones
                    }
                    //console.log('RESULTADOS DEL FINDALL: ' + celulares);
                    //return res.send (celulares)
                    return res.render('index', {info: celulares});
                })
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
                console.log('el primer findAll nos trae: ' + celulares)
                phones.findAll ({
                    include:[{association: 'owner'}, {association: 'comentarios'}],
                    where: [{brand: {[op.like]: '%' + req.query.search + '%'}}] //  asi deberia funcionar 
                })
                .then(function(celulares2){
                    console.log('el segundo findAll nos trae: ' + celulares2)
                    for(let i = 0; i < celulares2.length; i++){
                        celulares.push(celulares2[i])//lo pusheamos en un for porque si pusheamos de una celulares2, queda todo celulares2 en una posicion de celulares, y yo quiero que quede en varias posiciones
                    }
                    phones.findAll ({
                        include:[{association: 'owner'}, {association: 'comentarios'}],
                        where: [{year: {[op.like]: '%' + req.query.search + '%'}}] //  asi deberia funcionar 
                    })
                    .then(function(celulares3){
                        console.log('el segundo findAll nos trae: ' + celulares3)
                        for(let i = 0; i < celulares3.length; i++){
                            celulares.push(celulares3[i])//lo pusheamos en un for porque si pusheamos de una celulares2, queda todo celulares2 en una posicion de celulares, y yo quiero que quede en varias posiciones
                        }
                        phones.findAll ({
                            include:[{association: 'owner'}, {association: 'comentarios'}],
                            where: [{color: {[op.like]: '%' + req.query.search + '%'}}] //  asi deberia funcionar 
                        })
                        .then(function(celulares4){
                            console.log('el segundo findAll nos trae: ' + celulares4)
                            for(let i = 0; i < celulares4.length; i++){
                                celulares.push(celulares4[i])//lo pusheamos en un for porque si pusheamos de una celulares2, queda todo celulares2 en una posicion de celulares, y yo quiero que quede en varias posiciones
                            }
                            phones.findAll ({
                                include:[{association: 'owner'}, {association: 'comentarios'}],
                                where: [{memory: {[op.like]: '%' + req.query.search + '%'}}] //  asi deberia funcionar 
                            })
                            .then(function(celulares5){
                                console.log('el findall de memory: ' + celulares5)
                                for(let i = 0; i < celulares5.length; i++){
                                    celulares.push(celulares5[i])//lo pusheamos en un for porque si pusheamos de una celulares2, queda todo celulares2 en una posicion de celulares, y yo quiero que quede en varias posiciones
                                }
                                phones.findAll ({
                                    include:[{association: 'owner'}, {association: 'comentarios'}],
                                    where: [{size: {[op.like]: '%' + req.query.search + '%'}}] //  asi deberia funcionar 
                                })
                                .then(function(celulares6){
                                    console.log('el segundo findAll nos trae: ' + celulares6)
                                    for(let i = 0; i < celulares6.length; i++){
                                        celulares.push(celulares6[i])//lo pusheamos en un for porque si pusheamos de una celulares2, queda todo celulares2 en una posicion de celulares, y yo quiero que quede en varias posiciones
                                    }
                                    return res.render('search-results', {info: celulares, query: req.query.search});
                                })
                            })
                        })
                    })
                })
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
        },
}

//exportamos

module.exports = indexController;