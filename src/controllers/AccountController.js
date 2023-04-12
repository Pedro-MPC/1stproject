const commerceAPI = require('../../api/commerceAPI');
const customerModel = require('../models/customer/customer');

// Validate customer login to check if customer exist and if credentials are correct.

/**
 * Returns Login status (true if success / false if invalid)
 * @returns {object, boolean}
 */
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

/**
 * Checks if email already exist on database.
 * @returns {string, boolean}
 */
exports.checkEmailExist = () => {
    return async (req, res, next) => {
        // Getting customer data
        const checkEmailExist = await commerceAPI.checkEmailExist(req.body.email);
        if (checkEmailExist == 'emailAlreadyRegistered') {
            res.json({ msg: 'Email já registado', regSuccess: false });
        } else {
            next();
        }
    };
};

/**
 * Register a new Customer to database.
 * @returns {String, Boolean} msg - Sucess message | regSucess - Flag insert succeeded
 */
exports.registerCustomer = () => {
    return async (req, res, next) => {
        // Getting customer data
        const registerData = await commerceAPI.registerCustomer(
            req.body.email,
            req.body.password,
            req.body.fname,
            req.body.lname
        );
        if (registerData == 'customerInserted') {
            res.json({ msg: 'Registado com sucesso!', regSuccess: true });
        }
    };
};

/**
 * Check if session exists
 */
exports.checkSession = () => {
    return (req, res, next) => {
        res.on('finish', function () {
            if (!req.session.customer) {
                req.session.isLogged = false;
            }
        });

        next();
    };
};

/**
 * Customer logout. Destroy the logged user session.
 * @returns {String} [LOGOUTMSG] Logout message to client-side
 */
exports.logout = () => {
    return async (req, res, next) => {
        const LOGOUTMSG = 'Signing out...';
        req.session.destroy();
        res.json({ response: LOGOUTMSG });
        next();
    };
};
