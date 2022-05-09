module.exports = function (Sequelize,DataTypes){ //el modelo exporta una funcion
    
    //definir un alias que va a ser el nombre con el que vamos a llamar al modelo cuando estemos en el controlador
    let alias = 'Phone';

    //columnas y sus propiedades
    let cols = {
        id:{
            autoIncrement: true,
            primarykey:true,
            type: DataTypes.INTEGER,
        },
        image:{
            type: DataTypes.STRING,
        },
        model: {
            type: DataTypes.STRING,
        },
        brand:{
            type: DataTypes.STRING,
        },
        year:{
            type: DataTypes.DATE,
        },
        color:{
            type: DataTypes.STRING,
        },
        memory:{
            type: DataTypes.DECIMAL,
        },
        size:{
            type: DataTypes.DECIMAL,
        },
        dateOfUpload:{
            type: DataTypes.DATE,
        },
    }
    //CONFIGURACIONES ADICIONALES
    let config = { //puede no estar, cuando el nombre de la tabla es el nombre del modelo en plural
        tableName: 'phones',
        timestamps: false, //le dice al modelo si la tabla estan las columnas updatedAt y createdAt
        underscored: true, //si la tabla tiene columnas con nombres usando _.
    }
    const Phones = Sequelize.define(alias, cols, config);

    //Relaciones entre tablas

    return Phones;
}