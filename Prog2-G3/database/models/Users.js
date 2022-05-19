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
            username:{
                notNull: true,
                type: DataTypes.STRING,
            },
            password:{
                notNull: true,
                type: DataTypes.STRING,
            },
            date:{
                notNull: true,
                type: DataTypes.DATE,
            },
            dni:{
                notNull: true,
                type: DataTypes.INTEGER,
            },
            image:{
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