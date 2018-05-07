const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {

    });
    console.log(log);
    next();
});

app.get('/', (req, res) => {
    res.render('landing-page.hbs', {
        pageTitle: 'Landing Page'
    })
});

const sendBoutMe = (req, res) => {
    res.send('<h1>Melos</h1>>');
};

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    })
});
app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
    })
});

app.get('/fikokurva', (req, res) => {
    res.render('fikokurva.hbs', {
        obj1: 'obj1',
        obj2: 'obj2',
    })
});
app.get('/about2', sendBoutMe);


app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});