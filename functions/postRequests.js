const { Sequelize } = require('sequelize');
const { Flavour, User } = require('../models');

//export async function postVote
async function postVoteAndCreateUser(req, res) {
    const flavour = req.body.radioinput;
    const inputName = req.body.username;
    const inputEmail = req.body.email;

    const user = await User.findOne({ where: { email: inputEmail } });
    if (user) return
    if (!user) {
        const newUser = await User.create({
            user_name: inputName,
            email: inputEmail,
            password: "password"
        });
        const flavourToUpdate = await Flavour.findOne({ where: { flavour_name: flavour } });
        flavourToUpdate.increment('yum');
    }
    res.redirect('/');
}

async function suggestFlavour(req, res) {
    const flavour = req.body.flavour;
    await Flavour.create({
        flavour_name: flavour,
        yum: 0
    });
}

async function registerUser(req, res) {
    const user_name = req.body.username;
    const email = req.body.email;
    let password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    password = hash;

    await User.create({
        user_name, email, password
    });
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    const targetUser = await User.findOne({ where: { user_name: username } });
    const hash = targetUser.password;
    const isMatch = bcrypt.compareSync(password, hash);
    if (!isMatch) {
        console.log('Password did not match');
        res.redirect('/login');
    }
    if (isMatch) {
        console.log('Password is correct');
        res.redirect('/');
    }
}

//export all functions without declaring them individually
module.exports = {
    postVoteAndCreateUser,
    suggestFlavour,
    registerUser,
    loginUser
}
