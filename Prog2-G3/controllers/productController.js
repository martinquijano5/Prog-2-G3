//requires necesarios
let data = require('../db/index');

//funciones

const productController = {
    show: function (req,res){
        return res.render('product', {info: data});
    },
    add: function (req,res){
        return res.render('product-add', {info: data});
    }
}

//exportamos
module.exports = productController;