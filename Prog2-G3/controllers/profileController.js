//requires necesarios
let data = require('../db/index');

const db = require('../database/models')
const phones = db.Phone //de todos los modelos pide Phone(el alias)
const users = db.User // de todos los modelos pide User(el alias)
const comments = db.Comment
const op = db.Sequelize.Op;//contiene los operadores para usar en metodos de sequelize

const bcrypt = require('bcryptjs');
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
    }
}

//exportamos

module.exports = profileController;




