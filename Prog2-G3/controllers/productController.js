//requires necesarios
let data = require('../db/index');

//funciones

function  fillArray (largo) {
    var arr = [];
    while(arr.length < largo){
        var r = Math.floor(Math.random() * 10);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr
}

array = fillArray(5);

const productController = {
    show: function (req,res){
        return res.render('product', {info: data, array: array});
    },
    add: function (req,res){
        return res.render('product-add', {info: data});
    }
}

//exportamos
module.exports = productController;


