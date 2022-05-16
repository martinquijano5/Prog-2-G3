//requires necesarios

const { productos } = require('../db/index');
let data = require('../db/index');
let funcionFillArray = require('../utils/fillArray');
//funciones

let array = funcionFillArray(7);


const productController = {
    show: function (req,res){
        return res.render('product', {info: data, array: array,id: req.params.id});
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
            image: req.body.image,
            users_id: req.body.users_id,
        }

        //pegarlo a la bd con el metodo de sequelize

        //guardar info en la base de datos

        phone.create(product) //create agarra el objeto, se lo manda a la table en la bd y cuando esta lo guarda, devuelve el registro como parametro de la funcion del then
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                // return res.send(respuesta)
                res.redirect('/profile'); //redirigir
            })
            .catch(error => console.log (error))

        
    }
}
//exportamos
module.exports = productController;