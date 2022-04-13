const { User, Flavour } = require('../models');

Flavour.bulkCreate([
    {
        flavour_name: "Strawberry",
        yum: 0
    },
    {
        flavour_name: "Chocolate",
        yum: 0
    },
    {
        flavour_name: "Vanilla",
        yum: 0
    },
    {
        flavour_name: "Mango",
        yum: 0
    },
    {
        flavour_name: "Cherry",
        yum: 0
    }
]);
