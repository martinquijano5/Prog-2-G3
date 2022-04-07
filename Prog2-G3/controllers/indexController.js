//requires necesarios

//funciones

const indexController = {
    home: function (req,res){//esto se hace en /products. mmuestra todo el array
        return res.render('index');
    }
}


//exportamos

module.exports = indexController;