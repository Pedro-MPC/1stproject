const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
const http = require('http');
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
const categoryRoute = require('./routes/Category');
const CheckoutRoute = require('./routes/Checkout');

app.use(cookieParser('fsgdesgsdYYFCCXXX'));
app.use(csrf({ cookie: true }));

app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use(cartRoute);
app.use(productRoute);
app.use(homeRoute);
app.use(accountRoute);
app.use(categoryRoute);
app.use(CheckoutRoute);
app.use('*', errorRoute);

/** Setting up the server on port 3000 */
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World! From OpenLiteSpeed NodeJS\n');
  });
  
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
