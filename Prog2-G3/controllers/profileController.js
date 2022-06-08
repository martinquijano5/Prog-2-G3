//requires necesarios
let data = require('../db/index');

const db = require('../database/models')
const phones = db.Phone //de todos los modelos pide Phone(el alias)
const users = db.User // de todos los modelos pide User(el alias)
const comments = db.Comment
const op = db.Sequelize.Op;//contiene los operadores para usar en metodos de sequelize

const bcrypt = require('bcryptjs');

const multer = require('multer');
const path = require('path');
const { dirname } = require('path');
//funciones

const profileController = {
    show: function (req,res){
        let info = {
            usuario: null,
            productos: null,
            comentarios: null
        };
        users.findOne({
            where: [{id: req.params.id}]
        })
        .then(function(usuario){
            comments.findAll({
                where: [{FkUserId: req.params.id}]
            })
            .then(function(comentarios){
                phones.findAll({
                    where: [{FkUserId: req.params.id}]
                })
                .then(function(telefonos){
                    info.productos = telefonos;
                    info.usuario = usuario;
                    info.comentarios = comentarios
                    //return res.send(info);
                    return res.render('profile', {info: info, id: req.params.id});//datos de un usuario y todos sus telefonos
                })
            })
        })

        
    },
    edit: function (req,res){
        return res.render('profile-edit', {info: data});
    },
    register: function (req,res){
        return res.render('register');
    },
    login: function (req,res){
        return res.render('login');
    },
    storeProfile: function (req, res){
        console.log(req.body) // aca deberia llegar lo que mando el usuario


        let user = {
            email: req.body.email,
            username:req.body.user,
            password: bcrypt.hashSync(req.body.password, 10),
            date: req.body.date,
            dni: req.body.dni,
            image: req.file.filename
        }
        //pegar datos a bd
        users.create(user) //create agarra el objeto, se lo manda a la table en la bd y cuando esta lo guarda, devuelve el registro como parametro de la funcion del then
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                // return res.send(respuesta)
                res.redirect('/profile/1'); //redirigir falta ponerle el id del usuario en cuestion -> session
            })
            .catch(error => console.log (error))

    }
}

//exportamos

module.exports = profileController;




