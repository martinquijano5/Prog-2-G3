module.exports = function (Sequelize,DataTypes){ //el modelo exporta una funcion
    
    //definir un alias que va a ser el nombre con el que vamos a llamar al modelo cuando estemos en el controlador
    let alias = 'Comment';

    //columnas y sus propiedades
    let cols = {
        id:{
            primaryKey: true,
            notNull: true,
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        text:{
            notNull: true,
            type: DataTypes.STRING,
        },
        rating:{
            notNull: true,
            type: DataTypes.DECIMAL(2,1),
        },
        image:{
            notNull: true,
            type: DataTypes.STRING,
        },
        FkPhoneId: {
            notNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        FkUserId: {
            notNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
        }
        
    }
    //CONFIGURACIONES ADICIONALES
    let config = { 
        tableName: 'comments',//puede no estar, cuando el nombre de la tabla es el nombre del modelo en plural
        timestamps: false, //le dice al modelo si la tabla estan las columnas updatedAt y createdAt
        underscored: false, //si la tabla tiene columnas con nombres usando _.
    }
    const Comments = Sequelize.define(alias, cols, config);

    //Relaciones entre tablas

    return Comments;
}