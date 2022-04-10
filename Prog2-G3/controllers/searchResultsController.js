//requires necesarios
let data = require('../db/index');
//funciones

const searchResultsController = {
    search: function (req,res){
        return res.render('search-results', {info: data});
    }   
}

//exportamos
module.exports = searchResultsController;