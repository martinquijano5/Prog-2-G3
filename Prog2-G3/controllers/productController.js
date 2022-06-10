//requires necesarios
const { escapeRegExpChars } = require('ejs/lib/utils');
const db = require('../database/models'); //trae los modelos
const phones = db.Phone //de todos los modelos pide Phone(el alias)
const users = db.User // de todos los modelos pide User(el alias)
const comments = db.Comment
const op = db.Sequelize.Op;//contiene los operadores para usar en metodos de sequelize

const multer = require('multer');
const path = require('path');
const { dirname } = require('path');

const { productos } = require('../db/index');
let data = require('../db/index');
let funcionFillArray = require('../utils/fillArray');
//funciones


const productController = {
    show: function (req,res){
        phones.findOne({
            include: [{association: 'owner'}, {association: 'comentarios'}],
            where: [{id: req.params.id}]
        })
            .then(function(unTelefono){
                let comentadores = [];//checkear si el codigo este esta bien o hay otra forma de resolver
                if(unTelefono.comentarios[0] != undefined){
                    //return res.send('hay comentarios')
                    for(let i = 0; i < unTelefono.comentarios.length; i++){
                        users.findOne({
                            where: [{id: unTelefono.comentarios[i].FkUserId}]
                        })
                        .then(function(unComentador){
                            comentadores.push(unComentador);
                            if(i == unTelefono.comentarios.length - 1){
                                //return res.send(comentadores)
                                return res.render('product', {info: unTelefono, comentadores: comentadores, id: req.params.id});
                            }
                        })
                    }
                } else {
                    //return res.send('no hay comentarios')
                    return res.render('product', {info: unTelefono, comentadores: [], id: req.params.id});
                }
                //return res.send(unTelefono)
                
            })
        //return res.render('product', {info: data, array: array, id: req.params.id});
    },
    add: function (req,res){
        //renderizar el form para crear una pelicula
        //conseguir todos los generos de la based e datos
        return res.render('product-add', {info: data});
    },
    store: function (req,res){
        console.log(req.body) //obtener los datos del formulario y armar el objeto literal que quiero guardar

        let product = { //info del form
            model: req.body.model,
            brand: req.body.brand,
            year: req.body.year,
            color: req.body.color,
            memory: req.body.memory,
            size: req.body.size,
            date: req.body.date,
            image: req.file.filename,
            users_id: req.body.users_id,
            FkUserId: req.body.FkUserId
        }
        //pegarlo a la bd con el metodo de sequelize

        //guardar info en la base de datos

        phones.create(product) //create agarra el objeto, se lo manda a la table en la bd y cuando esta lo guarda, devuelve el registro como parametro de la funcion del then
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                // return res.send(respuesta)
                res.redirect(`/profile/${product.FkUserId}`); //redirigir
            })
            .catch(error => console.log (error))
    }
}
//exportamos
module.exports = productController;