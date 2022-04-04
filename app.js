const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const db = new Sequelize('sqlite://database/yummy.sqlite');


// Index page requests
app.get('/', async (req, res) => {
    const flavours = await db.query(`SELECT * FROM flavours`, { type: Sequelize.QueryTypes.SELECT });
    res.render('index', { flavours });
})
app.post('/vote', async (req, res) => {
    const flavour = req.body.radioinput;
    const user_name = req.body.username;
    const email = req.body.email;
    const yums = await db.query(`SELECT yum FROM flavours WHERE flavour_name = '${flavour}'`, { type: Sequelize.QueryTypes.SELECT });
    const newYum = yums[0].yum + 1;

    await db.query(`INSERT INTO users (user_name, email) VALUES ('${user_name}', '${email}')`);
    await db.query(`UPDATE flavours SET yum = ${newYum} WHERE flavour_name = '${flavour}'`);
    res.redirect('/');
})


//leaderboard page requests
app.get('/leaderboard', async (req, res) => {
    const flavours = await db.query(`SELECT * FROM flavours ORDER BY yum DESC`, { type: Sequelize.QueryTypes.SELECT });
    res.render('leaderboard', { flavours });
})


//Add a flavour page requests
app.get('/addaflavour', (req, res) => {
    res.render('addaflavour');
})
app.post('/suggest', async (req, res) => {
    const flavour = req.body.flavour;
    await db.query(`INSERT INTO flavours (flavour_name, yum) VALUES ('${flavour}', 0)`);
    res.redirect('/');
})


//Register and login page requests
app.get('/register', (req, res) => {
    res.render('register');
})
app.post('/register', async (req, res) => {
    const user_name = req.body.username;
    const email = req.body.email;
    let password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    password = hash;

    await db.query(`INSERT INTO users (user_name, email, password) VALUES ('${user_name}', '${email}', '${password}')`);
    res.redirect('/');
})

app.get('/login', (req, res) => {
    res.render('login');
})
app.post('/login', async (req, res) => {
    const user_name = req.body.username;
    let password = req.body.password;
    const targetUser = await db.query(`SELECT * FROM users WHERE user_name = '${user_name}'`, { type: Sequelize.QueryTypes.SELECT });
    const hash = targetUser[0].password;
    const isMatch = bcrypt.compareSync(password, hash);
    if (isMatch) {
        console.log('Password is correct');
        res.redirect('/');
    }
    else {
        console.log('Password did not match');
        res.redirect('/login');
    }
})



app.listen(8080, () => {
    console.log('Server started on port 8080');
});