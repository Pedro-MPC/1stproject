const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const commerceapi = require('../api/commerceAPI');

app.use(express.static('src/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());

/** Getting and setting routes */
const homeRoute = require('./routes/homepage');
const productRoute = require('./routes/products');
const errorRoute = require('./routes/404');

app.use(homeRoute);
app.use(productRoute);
app.use('*', errorRoute);

/** Setting up the server on port 3000 */
const port = 3000;
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Servidor iniciado em: localhost:${port}.`);
});
