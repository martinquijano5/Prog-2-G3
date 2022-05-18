    module.exports = function (Sequelize,DataTypes){
        let alias="Users"
        let cols={
            id:{
                autoIncrement: true,
                notNull: true,
                primaryKey:true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            email:{
                notNull: true,
                type: DataTypes.STRING,
                
            },
            usuario:{
                notNull: true,
                type: DataTypes.STRING,
            },
            contrasenia:{
                notNull: true,
                type: DataTypes.STRING,
            },
            fecha:{
                notNull: true,
                type: DataTypes.DATE,
            },
            dni:{
                notNull: true,
                type: DataTypes.INTEGER,
            },
            foto:{
                notNull: true,
                type: DataTypes.STRING,
            }
            
            
            
        }
        let config={
            tableName: 'users',
            timestamps: false, //le dice al modelo si la tabla estan las columnas updatedAt y createdAt
            underscored: true,

        }
        const Users = Sequelize.define(alias, cols, config);

    //Relaciones entre tablas

    return Users;
    }