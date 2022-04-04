const express = require('express');
const app = express();
const Sequelize = require('sequelize');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const db = new Sequelize('sqlite://database/yummy.sqlite');

app.get('/', async (req, res) => {
    const flavours = await db.query(`SELECT * FROM flavours`, { type: Sequelize.QueryTypes.SELECT });
    res.render('index', { flavours });
})

app.post('/vote', async (req, res) => {
    const flavour = req.body.radioinput;
    console.log(flavour);
    const yums = await db.query(`SELECT yum FROM flavours WHERE flavour_name = '${flavour}'`, { type: Sequelize.QueryTypes.SELECT });
    const newYum = yums[0].yum + 1;
    await db.query(`UPDATE flavours SET yum = ${newYum} WHERE flavour_name = '${flavour}'`);
    res.redirect('/');
})

app.get('/leaderboard', async (req, res) => {
    const flavours = await db.query(`SELECT * FROM flavours ORDER BY yum DESC`, { type: Sequelize.QueryTypes.SELECT });
    res.render('leaderboard', { flavours });
})



app.listen(8080, () => {
    console.log('Server started on port 8080');
});