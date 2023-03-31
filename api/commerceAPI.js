const { connection } = require('../database/db-connect');
const { Customer } = require('../src/models/customer');

// Products API functions
const getProductById = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM products WHERE _id='" + id + "'", function (err, results, fields) {
            if (err) {
                return reject(err);
            }
            if (results && results.length > 0) {
                return resolve(results);
            } else {
                var notFound = 'notFound';
                return resolve(notFound);
            }
        });
    });
};

const getAllProducts = async () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM products, category WHERE products.category = category.id',
            function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    return resolve(results);
                } else {
                    var notFound = 'notFound';
                    return resolve(notFound);
                }
            }
        );
    });
};

const getFeaturedProducts = async () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM products, category WHERE products.category = category.id AND products.isFeatured = 1',
            function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    return resolve(results);
                } else {
                    var notFound = 'notFound';
                    return resolve(notFound);
                }
            }
        );
    });
};

// Customer API functions
const getCustomerLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM customer WHERE email='" + email + "'AND password = md5('" + password + "')",
            function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const customer = new Customer('Login', results);
                    return resolve(customer);
                } else {
                    var notFound = 'notFound';
                    return resolve(notFound);
                }
            }
        );
    });
};

exports.getProductById = getProductById;
exports.getCustomerLogin = getCustomerLogin;
exports.getAllProducts = getAllProducts;
exports.getFeaturedProducts = getFeaturedProducts;
