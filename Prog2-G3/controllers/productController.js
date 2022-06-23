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
            where: [{id: req.params.id}],
            include: [{association: 'owner'}, {association: 'comentarios'}],
            //order: ['comentarios', 'order', 'desc']
        })
            .then(function(unTelefono){
                let comentarios = [];
                //return res.send(unTelefono.comentarios)
                for(let i = 0; i < unTelefono.comentarios.length; i++){
                    comentarios.push(unTelefono.comentarios[i])
                }
                //return res.send(comentarios);
                let comentariosOrdenados = comentarios.sort((a,b) => b.createdAt - a.createdAt);//como la consigna pide que los comentarios esten en orden descendiente ordenados por createdAt, con esta linea resolvemos esto
                //return res.send(comentariosOrdenados)
                unTelefono.comentarios = comentariosOrdenados;
                //return res.send(unTelefono)

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
                    //return res.send(unTelefono)
                    return res.render('product', {info: unTelefono, comentadores: [], id: req.params.id});
                }
                //return res.send(unTelefono)
                
            })
        //return res.render('product', {info: data, array: array, id: req.params.id});
    },
    add: function (req,res){
        //renderizar el form para crear una pelicula
        //conseguir todos los generos de la based e datos
        if (!req.session.user){
            res.redirect("/index" )
        }
        return res.render('product-add', {info: data});
    },
    store: function (req,res){

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
        let product = { //info del form
            model: req.body.model,
            brand: req.body.brand,
            year: req.body.year,
            color: req.body.color,
            memory: req.body.memory,
            size: req.body.size,
            date: req.body.date,
            image: image,
            users_id: req.body.users_id,
            FkUserId: req.body.FkUserId,
            promedioRating: 0,
            createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
        //pegarlo a la bd con el metodo de sequelize
        //guardar info en la base de datos

        phones.create(product) //create agarra el objeto, se lo manda a la table en la bd y cuando esta lo guarda, devuelve el registro como parametro de la funcion del then
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                // return res.send(respuesta)
                return res.redirect(`/profile/${product.FkUserId}`); //redirigir
            })
            .catch(error => console.log (error))
    },
    storeComment: function (req, res){
        console.log(req.body);
        if(req.body.text==""){
            res.redirect('/product/' + req.body.FkPhoneId);
            
        }else{
        let comment = {
            text: req.body.text,
            rating: req.body.rating,
            FkUserId: req.body.FkUserId,
            FkPhoneId: req.body.FkPhoneId
        }
        console.log(comment)
        comments.create(comment)
        .then(function(){
            let acumulador = 0;
            let ratingPromedio = 0;
            comments.findAll({
                where: [{FkPhoneId: comment.FkPhoneId}]
            })
            .then(function(todos){
                //res.send(todos);
                for(let i = 0; i < todos.length; i ++){
                    acumulador += todos[i].rating;
                }
                ratingPromedio = acumulador / todos.length;
                phones.findOne({
                    where: [{id: comment.FkPhoneId}]
                })
                .then(function(result){
                    let telefono = {
                        id: result.id,
                        image: result.image,
                        model: result.model,
                        brand: result.brand,
                        year: result.year,
                        color: result.color,
                        memory: result.memory,
                        size: result.size,
                        FkUserId: result.FkUserId,
                        promedioRating: result.ratingPromedio
                    }
                    phones.update(telefono, {
                        where: {id: comment.FkPhoneId}
                    })
                    .then(function(){
                        return res.redirect(`/product/${telefono.id}`);
                    })
                })
            })
        })}
    },
    edit:function(req,res){
        phones.findByPk(req.params.id)
        .then(phone=>{
            //return res.send(phone)
            res.render("product-edit",{
                info:phone
            })
        })
        
    },
    update:function(req,res){
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
        //res.send (req.body)
        let telefono = {
            id: req.params.id,
            image: image,
            model: req.body.model,
            brand: req.body.brand,
            year: req.body.year,
            color: req.body.color,
            memory: req.body.memory,
            size: req.body.size,
            createdAt: req.body.createdAt,
            updatedAt: new Date(),
            promedioRating: req.body.ratingPromedio,
            FkUserId: req.body.FkUserId,
        }
        //res.send(telefono)
        phones.update(telefono,{where:{id:req.params.id}})
        .then(function() {
            return res.redirect('/product/'+req.params.id)
        })
    },
    delete: function(req,res){
        phones.destroy({where: {id: req.params.id}})
        .then(function(){
            return res.redirect('/profile/'+user.id)
        })
    }
}
//exportamos
module.exports = productController;