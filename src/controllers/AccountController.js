const commerceAPI = require('../../api/commerceAPI');
const customerModel = require('../models/customer/customer');
const productFactory = require('../scripts/factory/product');

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
            console.log(' registered');
            res.json({ regSuccess: false });
        } else if (checkEmailExist == 'notRegistered') {
            console.log('not registered');
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
            res.json({ msg: 'Account sucessfully created!', regSuccess: true });
        }
    };
};

/**
 * Check if session exists middleware
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
 * Middleware to check if User is Authenticated
 */
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
 * Get User account page.
 * @returns {View} - Renders account page view.
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

/**
 * Renders the Account Page Details partial.
 * @returns {View} - Renders account page details partial.
 */
exports.accountPageDetails = () => {
    return async (req, res, next) => {
        res.render('partials/account/my-account-details', {
            customer: req.session.customer,
            csrfToken: req.csrfToken()
        });
    };
};

/**
 * Renders the Account Page Orders partial.
 * @returns {View} - Renders account page orders partial.
 */
exports.accountPageOrders = () => {
    return async (req, res, next) => {
        var customerOrders;
        if (res.locals.ORDERS) {
            customerOrders = res.locals.ORDERS;
        } else {
            customerOrders = 'notFound';
        }
        res.render('partials/account/my-account-orders', {
            customer: req.session.customer,
            ORDERS: customerOrders
        });
    };
};

/**
 * Save customer details from Account page.
 * @returns {String} - Updated customer details
 */
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

/**
 * Get all Orders from Customer
 */
exports.ordersByCustomers = () => {
    return async (req, res, next) => {
        const ORDERS = await commerceAPI.ordersByCustomers(req.session.customer.email);

        console.log(ORDERS[0]);
        if (ORDERS[0] == 'notFound') {
            next();
        } else {
            res.locals.ORDERS = ORDERS;
            next();
        }
    };
};

/**
 * Get all details from an Order.
 * @returns {Array} - Array with all the details of an order
 */
exports.orderDetailsById = () => {
    return async (req, res, next) => {
        const ORDER = await commerceAPI.orderDetailsById(req.query.order_id, req.query.limit);

        const orderProducts = ORDER.productID.split(',');
        const products = await Promise.all(
            orderProducts.map(async (product) => {
                const products = await Promise.all(
                    orderProducts.map(async (product) => {
                        const PRODUCT = await productFactory.getProductFactory('tile', product);
                        return PRODUCT;
                    })
                );
                ORDER.products = products;
            })
        );
        console.log(req.query.order_id);
        if (ORDER == 'notFound') {
            console.log('ORDER NOT FOUND');
        } else {
            console.log(ORDER);
            res.render('partials/account/orders/modal-details', { ORDER: ORDER });
        }
    };
};
