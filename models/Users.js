const { DataTypes, Model } = require('sequelize');

class Users extends Model { }

module.exports = (sequelize) => {
    Users.init({
        user_id: {
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
    },
        {
            sequelize,
            modelName: 'Users',
            createdAt: false,
            updatedAt: false
        }
    )

    return Users;
}

