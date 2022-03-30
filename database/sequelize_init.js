const { Model, DataTypes } = require('sequelize');
const db = require('./connection.js');

class Flavours extends Model { }
class Users extends Model { }

Flavours.init(
    {
        flavour_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        flavour_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        yum: {
            type: DataTypes.INTEGER,
        },
        yuck: {
            type: DataTypes.INTEGER,
        },
        totalVotes: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize : db,
        modelName: 'flavours',
        timestamps: false,
    }
);

Users.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize : db,
        modelName: 'users',
    }
);

Flavours.sync();
Users.sync();

Flavours.create(
    {
        flavour_name: 'Strawberry',
        yum: 5,
        yuck: 1,
        totalVotes: 6
    },
);



module.exports = { Flavours, Users };
