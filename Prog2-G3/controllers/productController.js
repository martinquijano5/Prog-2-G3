//requires necesarios

//funciones

const productController = {
    show: function (req,res){
        return res.render('product');
    }
}

//exportamos
module.exports = productController;