const { User, Flavour} = require('../models');

User.sync({force: true})
Flavour.sync({force: true})
