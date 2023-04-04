const { forEach } = require('lodash');
const { connection } = require('../database/db-connect');
const { Customer } = require('@models/customer/customer');
const productModel = require('@models/product/index');

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

const getAllProductsPDP = async () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM products, category WHERE products.category = category.id',
            function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const PRODUCTSPDP = [];
                    results.forEach((product) => {
                        PRODUCTSPDP.push(
                            new productModel.productPDP(
                                product._id,
                                product.name,
                                product.preco,
                                product.descCat,
                                product.desc,
                                product.img
                            )
                        );
                    });
                    return resolve(PRODUCTSPDP);
                } else {
                    var notFound = 'notFound';
                    return resolve(notFound);
                }
            }
        );
    });
};

// Get all the info of Featured Products
const getFeaturedProducts = async () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT _id, name, preco, img, descCat FROM products, category WHERE products.category = category.id AND products.isFeatured = 1',
            function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const PRODUCTSTILE = [];
                    results.forEach((product) => {
                        console.log(product);
                        PRODUCTSTILE.push(
                            new productModel.productTile(
                                product._id,
                                product.name,
                                product.preco,
                                product.descCat,
                                product.img
                            )
                        );
                    });
                    return resolve(PRODUCTSTILE);
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
            "SELECT email FROM customer WHERE email='" + email + "'AND password = md5('" + password + "')",
            async function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const customer = new Customer(await getCustomerInfo(email));
                    return resolve(customer);
                } else {
                    var notFound = 'notFound';
                    return resolve(notFound);
                }
            }
        );
    });
};

// Customer API functions
const getCustomerInfo = async (email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT fname, lname, email FROM customer WHERE email='" + email + "'",
            function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const customer = results[0];
                    return resolve(customer);
                } else {
                    var notFound = 'notFound';
                    return resolve(notFound);
                }
            }
        );
    });
};

// Check if an email is already registered to the Db
const checkEmailExist = async (email) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT email from customer WHERE email = '" + email + "'", function (err, results, fields) {
            if (err) {
                return reject(err);
            }
            if (results && results.length > 0) {
                console.log('Exist.');
                return resolve('emailAlreadyRegistered');
            } else {
                return resolve('Dont exist.');
            }
        });
    });
};

// Register a customer
const registerCustomer = async (email, password, fname, lname) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO customer (email, password, fname, lname, dtAdd) VALUES ('" +
                email +
                "',md5('" +
                password +
                "'),'" +
                fname +
                "','" +
                lname +
                "', now())",
            function (err) {
                if (err) throw err;
                console.log('1 record inserted');
                return resolve('customerInserted');
            }
        );
    });
};

exports.checkEmailExist = checkEmailExist;
exports.getProductById = getProductById;
exports.getCustomerLogin = getCustomerLogin;
exports.getAllProductsPDP = getAllProductsPDP;
exports.getFeaturedProducts = getFeaturedProducts;
exports.registerCustomer = registerCustomer;
