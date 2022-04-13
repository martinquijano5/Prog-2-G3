//requires necesarios
let data = require('../db/index');
let funcionFillArray = require('../utils/fillArray');
//funciones

let array = funcionFillArray(5);


const productController = {
    show: function (req,res){
        return res.render('product', {info: data, array: array,id: req.params.id});
    },
    add: function (req,res){
        return res.render('product-add', {info: data});
    },
    create: function (req,res){
        return res.send('formulario');
    },
}
//exportamos
module.exports = productController;


