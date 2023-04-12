const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

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
            maxAge: 86400000 // Time is in miliseconds
        }
    })
);

/** Getting and setting routes */
const homeRoute = require('./routes/homepage');
const productRoute = require('./routes/Product');
const errorRoute = require('./routes/404');
const accountRoute = require('./routes/Account');
const cartRoute = require('./routes/Cart');

app.use(cartRoute);
app.use(productRoute);

app.use(homeRoute);
app.use(accountRoute);
app.use('*', errorRoute);

/** Setting up the server on port 3000 */
const port = 3001;
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Servidor iniciado em: localhost:${port}.`);
});
