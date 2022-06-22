//requires necesarios
let data = require('../db/index');

const db = require('../database/models')
const phones = db.Phone //de todos los modelos pide Phone(el alias)
const users = db.User // de todos los modelos pide User(el alias)
const comments = db.Comment
const userFollowers = db.UserFollower
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
                    userFollowers.findAll({
                        where: [{FkUserId: req.params.id}]
                    })
                    .then(function(seguidores){
                        userFollowers.findOne({
                            where: [{FkUserId: req.params.id},{FkFollowerId: res.locals.user.id}] 
                        })
                        .then(function(yaSigue){
                            info.productos = telefonos;
                            info.usuario = usuario;
                            info.comentarios = comentarios;
                            info.seguidores = seguidores; 
                            info.yaSigue = yaSigue;
                            //return res.send(info);
                            return res.render('profile', {info: info, id: req.params.id});//datos de un usuario y todos sus telefonos
                        })
                    })
                })
            })
        })

        
    },
    edit: function (req,res){
        if (!req.session.user){
            res.redirect("/index" )
        }
        let id = req.params.id;
        users.findOne({
            where: [{id: id}]
        })
        .then(function(usuario){
            //return res.send(usuario);
            return res.render('profile-edit', {info: usuario});
        })

    },
    register: function (req,res){
        if (req.session.user){
            res.redirect("/index" )
        }
        return res.render('register');
    },
    editProfile: (req,res)=>{

        if (!req.file){
            console.log('entro al filename')
            req.file.filename = '/images/users/default-image.png'
        }

        let user = {
            email: req.body.email,
            
            username:req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            date: req.body.date,
            dni: req.body.dni,
            image: req.file.filename
        }
        //pegar datos a bd
        users.update(user,{
            where:{
                id:req.body.id
            }
        }) //create agarra el objeto, se lo manda a la table en la bd y cuando esta lo guarda, devuelve el registro como parametro de la funcion del then
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                // return res.send(respuesta)
                res.redirect(`/profile/${req.body.id}`); //redirigir falta ponerle el id del usuario en cuestion -> session
            })
            .catch(error => console.log (error))
    },
    login: function (req,res){
        if (req.session.user){
            res.redirect("/index" )
        }
        return res.render('login');
    },
    storeProfile: function (req, res){
        
        console.log(req.body) // aca deberia llegar lo que mando el usuario

        var image;
        if (req.file){
            console.log('el filename es ahora es ' + req.file.filename) //obtener los datos del formulario y armar el objeto literal que quiero guardar
            image = req.file.filename
            console.log('entro a la foto');
        } else {
            console.log('el filename es ahora es vacio') //obtener los datos del formulario y armar el objeto literal que quiero guardar
            console.log('no entro a la foto, pongo default')
            image = 'default-image.png'
        }
        if(req.body.password.length<3){
            res.locals.errores={mensaje:"la contraseña debe tener mas de tres caracteres"}
            return res.render("register")
        }
        let user = { 
            email: req.body.email,
            username:req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            date: req.body.date,
            dni: req.body.dni,
            image: image
        }

        users.findOne({
            where: [{email: user.email}] //encontrar un mail que coincida con el mail que ingreso el usuario
        })

        .then(function(usuario){ //el then es para que el codigo se ejecute recien cuando se chequee la linea de arriba (el find one)
            if (usuario) {
                console.log ('el usuario ya existe')
                res.locals.errores = {mensaje: 'El email ya esta en uso'}
                console.log(res.locals.errores)
                return res.render('register')
            }else{
                res.locals.errores = ''; 
                console.log ('el usuario no existe')
                users.create(user) //create agarra el objeto, se lo manda a la table en la bd y cuando esta lo guarda, devuelve el registro como parametro de la funcion del then
                .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                    // return res.send(respuesta)
                    return res.redirect('/index'); //redirigir falta ponerle el id del usuario en cuestion -> session
                })
            }
        })
        
            .catch(error => console.log (error))

    },
    login: function(req, res){
        //mostrar el form de registro
        //Chequear que un usario esté logueado
        if(req.session.user != undefined){
            res.locals.errores = 'ya estas logueado';
            return res.redirect('/index')
        } else {  
            return res.render('login');
        }
    },
    logout: function(req, res){
        //destruir session
        req.session.destroy();

        //Eliminar cookie si existe.
        if(req.cookies.userId !== undefined){
            res.clearCookie('userId')
        }

        return res.redirect('/index');

    },

    signIn: function(req, res){
       
        console.log("entre al sign in");
        users.findOne({
            where: [{email: req.body.email}]
        })
            .then(function(user){
                //si trajo un usuario hay que chequear la contraseña con compareSync()
                //Si las contraseñas no coincuiden mandamos mensaje de error.
                console.log(req.body)
                console.log('el usuario es: ' + user);

                if(user){
                    console.log('entro al if(user)');
                    if(bcrypt.compareSync(req.body.password, user.password)){
                        //Si el usuario tildó recordarme creo la cookie
                        if (req.body.remember) {
                            res.cookie('userId',user.dataValues.id,{maxAge: 1000*60*100} );
                        } 
                        console.log('coinciden');
                        req.session.user = user.dataValues;
                        res.locals.errores = ''
                        console.log('los errores son' + res.locals.errores);
                        return res.redirect('/profile/' + user.dataValues.id)
                    } else {
                        res.locals.errores = {mensaje:"la password no concide"};
                        console.log('los errores son' + res.locals.errores);
                        return res.render('login')
                    }

                } else{
                    res.locals.errores ={mensaje:"El email es incorrecto"} 
                    console.log(res.locals.errores);
                    return res.render('login')
                }
            })
            .catch(error => console.log(error))
        
    },

    storeFollower:function (req, res) {
        //res.send(req.body)
        let follower = {
            FkUserId:req.body.usuarioSeguido,
            FkFollowerId: req.body.usuarioSeguidor
        }
        if(req.body.seguido == 1) {
            userFollowers.create(follower)
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                // return res.send(respuesta)
                return res.redirect('/profile/' + req.body.usuarioSeguido); //redirigir falta ponerle el id del usuario en cuestion -> session
            })
        }
        if(req.body.seguido == 0) {
            userFollowers.destroy({
                where: [{FkUserId: req.body.usuarioSeguido,},{FkFollowerId: req.body.usuarioSeguidor}] 
            })
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                // return res.send(respuesta)
                return res.redirect('/profile/' + req.body.usuarioSeguido); //redirigir falta ponerle el id del usuario en cuestion -> session
            })
        }

        
    }
}

//exportamos

module.exports = profileController;


