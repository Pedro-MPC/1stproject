const commerceAPI = require('../../api/commerceAPI');
const customerModel = require('../models/customer/customer');

// Validate customer login to check if customer exist and if credentials are correct.
exports.validateLogin = () => {
    return async (req, res, next) => {
        // Getting customer data
        const Customer = await customerModel.Customer('basic', req.body.email, req.body.password);

        var findFlag = false;
        if (Customer == 'notFound') {
            findFlag = false;
        } else {
            var notLoggedCart = req.session.cart;
            req.session.regenerate(function (err) {
                if (err) next(err);
                // store user information in session
                req.session.cart = notLoggedCart;
                req.session.customer = Customer;
                console.log(req.session.customer);
                req.session.isLogged = true;
                //Flag user sucessfully logged in
                findFlag = true;
                // save the session before redirection to ensure page
                // load does not happen before session is saved
            });
        }
        //Saving new session
        req.session.save(function (err) {
            if (err) return next(err);
            res.json({ customer: Customer, findFlag: findFlag });
        });
    };
};

// Register a Customer
exports.registerCustomer = () => {
    return async (req, res, next) => {
        // Getting customer data
        const registerData = await commerceAPI.registerCustomer(
            req.body.email,
            req.body.password,
            req.body.fname,
            req.body.lname
        );
        const regSuccess = true;
        if (registerData == 'customerInserted') {
            res.json({ msg: 'Registado com sucesso!', regSuccess: regSuccess });
        }
    };
};

//Check if email exists when registering a new account
exports.checkEmailExist = () => {
    return async (req, res, next) => {
        // Getting customer data
        const checkEmailExist = await commerceAPI.checkEmailExist(req.body.email);
        const regSuccess = false;
        if (checkEmailExist == 'emailAlreadyRegistered') {
            res.json({ msg: 'Email já registado', regSuccess: regSuccess });
        } else {
            next();
        }
    };
};

// Check if customer is logged or not. If not creates a guest session.
exports.checkSession = () => {
    return (req, res, next) => {
        if (req.method === 'GET') {
            res.on('finish', function () {
                if (req.session.customer) {
                    console.log('Logged Cart: ' + req.session.cart);
                } else {
                    req.session.isLogged = false;
                    console.log('Not Logged Cart: ' + req.session.cart);
                }
            });
        }
        next();
    };
};

// Customer logout
exports.logout = () => {
    return async (req, res, next) => {
        const LOGOUTMSG = 'Signing out...';
        console.log('BEFORE: ' + req.session);
        req.session.destroy();
        console.log('AFTER: ' + req.session);
        res.json({ response: LOGOUTMSG });
        next();
    };
};

exports.globalAccountVariables = () => {
    return async (req, res, next) => {
        res.json({ customer: req.session.customer, cart: req.session.cart });
    };
};
