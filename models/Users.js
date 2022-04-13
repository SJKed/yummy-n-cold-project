const { DataTypes, Model } = require('sequelize');


module.exports = database => {
    class Users extends Model { }

    Users.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            sequelize: database,
            modelName: 'Users',
            createdAt: false,
            updatedAt: false
        }
    )

    return Users;
}

