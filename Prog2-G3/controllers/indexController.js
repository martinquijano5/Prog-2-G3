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


arrayNovedades = fillArray(4);
arrayMasComentados = fillArray(4);


const indexController = {
    home: function (req,res){
        return res.render('index', {info: data, arrayNovedades: arrayNovedades, arrayMasComentados: arrayMasComentados});
    }
}


//exportamos

module.exports = indexController;