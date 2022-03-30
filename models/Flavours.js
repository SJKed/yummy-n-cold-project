const { DataTypes, Model } = require('sequelize');

class Flavours extends Model { }

module.exports = (sequelize) => {
    Flavours.init({
        flavour_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        flavour_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        yuk: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalVotes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            sequelize,
            modelName: 'flavours'
        }
    )

    return Flavours;
}

