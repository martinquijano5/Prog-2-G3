//requires necesarios
let data = require('../db/index');
const db = require('../database/models')
const bcrypt = require('bcryptjs');

//funciones

const profileController = {
    show: function (req,res){
        return res.render('profile', {info: data});
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




