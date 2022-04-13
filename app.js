const express = require('express');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const { User, Flavour } = require('./models');
const { postVoteAndCreateUser, suggestFlavour, registerUser, loginUser } = require('./functions/postRequests');


// Index page requests
app.get('/', async (req, res) => {
    const flavours = await Flavour.findAll();
    res.render('index', { flavours });
})
app.post('/vote', async (req, res) => {
    postVoteAndCreateUser(req, res);
});


app.get('/leaderboard', async (req, res) => {
    const flavours = await Flavour.findAll({
        order: [['yum', 'DESC']],
        //sequelize.op.gt == operator.greaterThan https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
        where: { yum: { [Sequelize.Op.gt]: 0 } }
    });
    res.render('leaderboard', { flavours });
})


//Add a flavour page requests
app.get('/addaflavour', (req, res) => {
    res.render('addaflavour');
})
app.post('/suggest', async (req, res) => {
    suggestFlavour(req, res);
    res.redirect('/');
})


//Register and login page requests
app.get('/register', (req, res) => {
    res.render('register');
})
app.post('/register', async (req, res) => {
    registerUser(req, res)
    res.redirect('/');
})
app.get('/login', (req, res) => {
    res.render('login');
})
app.post('/login', async (req, res) => {
    loginUser(req, res)
})


app.listen(8080, () => {
    console.log('Server started on port 8080');
});