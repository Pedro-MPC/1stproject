const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const commerceapi = require('../api/commerceAPI');
const session = require('express-session');
const jquery = require('./views/partials/jquery');
app.use(express.static('src/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.use(
    session({
        secret: ['veryimportantsecret', 'notsoimportantsecret', 'highlyprobablysecret'],
        name: 'secretname',
        cookie: {
            httpOnly: true,
            sameSite: true,
            maxAge: 600000 // Time is in miliseconds
        }
    })
);
console.log(session);

/** Getting and setting routes */
const homeRoute = require('./routes/Homepage');
const productRoute = require('./routes/productdetails');
const errorRoute = require('./routes/404');
const accountRoute = require('./routes/Account');

app.use(homeRoute);
app.use(productRoute);
app.use(accountRoute);
app.use('*', errorRoute);

/** Setting up the server on port 3000 */
const port = 3000;
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Servidor iniciado em: localhost:${port}.`);
});
