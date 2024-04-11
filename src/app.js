const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const app = express();

// Middleware
app.use(express.static('src/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cookieParser('fsgdesgsdYYFCCXXX'));
app.use(
    session({
        secret: ['veryimportantsecret', 'notsoimportantsecret', 'highlyprobablysecret'],
        name: 'secretname',
        cookie: {
            httpOnly: true,
            sameSite: true,
            maxAge: 86400000 // Time is in milliseconds
        }
    })
);
app.use(csrf({ cookie: true }));

// Locals Middleware
app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Routes
const homeRoute = require('./routes/homepage');
const productRoute = require('./routes/Product');
const errorRoute = require('./routes/404');
const accountRoute = require('./routes/Account');
const cartRoute = require('./routes/Cart');
const categoryRoute = require('./routes/Category');
const CheckoutRoute = require('./routes/Checkout');

app.use(cartRoute);
app.use(productRoute);
app.use(homeRoute);
app.use(accountRoute);
app.use(categoryRoute);
app.use(CheckoutRoute);
app.use('/', errorRoute);


// Error Handling Middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// // Create HTTP server
// const server = http.createServer(app);

// // Start the server
// const port = 3000;
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
//   });

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('teste');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
