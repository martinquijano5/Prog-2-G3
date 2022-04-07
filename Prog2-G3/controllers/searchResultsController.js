//requires necesarios

//funciones

const searchResultsController = {
    search: function (req,res){
        return res.render('search-results');
    }
}

//exportamos
module.exports = searchResultsController;