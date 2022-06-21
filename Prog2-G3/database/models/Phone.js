module.exports = function (Sequelize,DataTypes){ //el modelo exporta una funcion
    
    //definir un alias que va a ser el nombre con el que vamos a llamar al modelo cuando estemos en el controlador
    let alias = 'Phone';

    //columnas y sus propiedades
    let cols = {
        id:{
            primaryKey: true,
            notNull: true,
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        image:{
            notNull: true,
            type: DataTypes.STRING,
        },
        model: {
            notNull: true,
            type: DataTypes.STRING,
        },
        brand:{
            notNull: true,
            type: DataTypes.STRING,
        },
        year:{
            notNull: true,
            type: DataTypes.INTEGER(4).UNSIGNED,
        },
        color:{
            notNull: true,
            type: DataTypes.STRING,
        },
        memory:{
            notNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        size:{
            notNull: true,
            type: DataTypes.DECIMAL(2,1),
        },
        createdAt:{
            notNull: true,
            type: DataTypes.DATE,
        },
        updatedAt:{
            type: DataTypes.DATE,
        },
        
        FkUserId:{
            notNull:true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        
    }
    //CONFIGURACIONES ADICIONALES
    let config = { //puede no estar, cuando el nombre de la tabla es el nombre del modelo en plural
        tableName: 'phones',
        timestamps: true, //le dice al modelo si la tabla estan las columnas updatedAt y createdAt
        underscored: false, //si la tabla tiene columnas con nombres usando _.
    }
    const Phone = Sequelize.define(alias, cols, config);

    //Relaciones entre tablas --> un telefono (1) pertenece a un usuario (n)

    Phone.associate = function(models){
        Phone.belongsTo(models.User,
            {
                as: 'owner',
                foreignKey: 'FkUserId'
            });
        Phone.hasMany(models.Comment,
            {
                as: 'comentarios',
                foreignKey: 'FkPhoneId'
            });
    }



    return Phone;
}