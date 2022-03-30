const express = require('express');
const app = express();
const { PromisedDatabase } = require('promised-sqlite3')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    res.render('index');
});


app.listen(8080)