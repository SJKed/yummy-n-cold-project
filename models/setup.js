const { sqlite3 } = require('promised-sqlite3');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database/yummy.sqlite'
})

const Flavours = require('./Flavours')(sequelize, DataTypes);
const Users = require('./Users')(sequelize, DataTypes);

Flavours.sync({ force: true }).then(() => {
    console.log('Flavours table created');
    Flavours.create({
        flavour_name: 'Vanilla',
        yum: 5,
        yuk: 1,
        totalVotes: 6
    });
    Flavours.create({
        flavour_name: 'Chocolate',
        yum: 3,
        yuk: 2,
        totalVotes: 5
    });
    Flavours.create({
        flavour_name: 'Strawberry',
        yum: 1,
        yuk: 5,
        totalVotes: 6
    });
});

Users.sync({ force: true }).then(() => {
    console.log('Users table created');
    Users.create({
        user_name: 'John',
        email: 'ihate@sequelize.com',
    });
});
