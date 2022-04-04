const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/yummy.sqlite'
})

const Flavours = require('./Flavours')(sequelize, DataTypes);
const Users = require('./Users')(sequelize, DataTypes);

Flavours.sync().then(() => {
    console.log('Flavours table created');
    Flavours.create({
        flavour_name: 'Vanilla',
        yum: 5,
    });
    Flavours.create({
        flavour_name: 'Chocolate',
        yum: 3,
    });
    Flavours.create({
        flavour_name: 'Strawberry',
        yum: 1,
    });
});

Users.sync().then(() => {
    console.log('Users table created');
});
