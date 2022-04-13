const { DataTypes, Model } = require('sequelize');


module.exports = database => {
    class Flavours extends Model { }

    Flavours.init({
        id: {
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
    },
        {
            sequelize: database,
            modelName: 'Flavours',
            createdAt: false,
            updatedAt: false
        }
    )

    return Flavours;
}