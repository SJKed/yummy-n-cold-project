const express = require('express');
const app = express();
const { PromisedDatabase } = require('promised-sqlite3')

const db = new PromisedDatabase('../database/yummy.sqlite')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        await db.open()
        const flavours = await db.all('SELECT * FROM Flavours')
        const users = await db.all('SELECT * FROM Users')
        await db.close();
        res.render('index', { flavours, users })
    } catch (err) {
        console.log(err)
    }
})


app.listen(8080, () => {
    console.log('Server started on port 8080');
});