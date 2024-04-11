const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const app = express();
const http = require('http');

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
app.use('*', errorRoute);



// Create HTTP server
const server = http.createServer(app);

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
