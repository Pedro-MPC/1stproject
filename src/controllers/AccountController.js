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
exports.isAuthenticated = () => {
    return (req, res, next) => {
        if (!req.session.customer) {
            res.redirect('/'); // Redirect to login page if user is not authenticated
        } else {
            next();
        }
    };
};
/**
 * Customer logout. Destroy the logged user session.
 * @returns {String} [LOGOUTMSG] Logout message to client-side
 */
exports.accountPage = () => {
    return async (req, res, next) => {
        res.render('pages/my-account', {
            customer: req.session.customer,
            pgTitle: 'My Account',
            isLoggedIn: req.session.isLogged,
            csrfToken: req.csrfToken()
        });
    };
};

exports.accountPageDetails = () => {
    return async (req, res, next) => {
        res.render('partials/account/my-account-details', {
            customer: req.session.customer,
            csrfToken: req.csrfToken()
        });
    };
};

exports.accountPageOrders = () => {
    return async (req, res, next) => {
        var customerOrders;
        if (res.locals.ORDERS) {
            customerOrders = res.locals.ORDERS;
        } else {
            customerOrders = 'notFound';
        }
        res.render('partials/account/my-account-orders', { customer: req.session.customer, ORDERS: customerOrders });
    };
};

exports.saveCustomerDetails = () => {
    return async (req, res, next) => {
        const SAVEDETAILS = await commerceAPI.updateCustomerDetails(
            req.session.customer.id,
            req.body.fname,
            req.body.lname,
            req.body.email
        );
        if (SAVEDETAILS == 'detailsUpdated') {
            res.json({
                customer_fname: req.body.fname,
                customer_lname: req.body.lname,
                customer_email: req.body.email
            });
        }
    };
};

/**
 * Customer logout. Destroy the logged user session.
 * @returns {String} [LOGOUTMSG] Logout message to client-side
 */
exports.logout = () => {
    return async (req, res, next) => {
        req.session.destroy();
        res.json({ response: 'success' });
    };
};

/**
 * Get Customer Details and update the customer on the session variable
 */
exports.getCustomerDetails = () => {
    return async (req, res, next) => {
        if (req.session.customer) {
            const CUSTOMER = await customerModel.CustomerDetails('basic', req.session.customer.email);
            req.session.customer = CUSTOMER;
        }
        next();
    };
};

exports.ordersByCustomers = () => {
    return async (req, res, next) => {
        const ORDERS = await commerceAPI.ordersByCustomers(req.session.customer.email);
        if (ORDERS[0] == 'notFound') {
            next();
        } else {
            res.locals.ORDERS = ORDERS;
            next();
        }
    };
};

exports.orderDetailsById = () => {
    return async (req, res, next) => {
        const ORDERS = await commerceAPI.orderDetailsById(req.session.customer.email);
        if (ORDERS[0] == 'notFound') {
            next();
        } else {
            res.locals.ORDERDETAILS = ORDERS;
            next();
        }
    };
};
