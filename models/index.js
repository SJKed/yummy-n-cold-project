const { Sequelize } = require("sequelize");
const Users = require("./Users")
const Flavours = require("./Flavours")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database/yummy.sqlite"
});

const Flavour = Flavours(sequelize);
const User = Users(sequelize);

Flavour.hasMany(User, { foreginKey: "flavour_id" });
User.belongsTo(Flavour, { foreginKey: "flavour_id" });

module.exports = {
    User,
    Flavour
};