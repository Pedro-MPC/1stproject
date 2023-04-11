const { connection } = require('../database/db-connect');
const { Customer } = require('@models/customer/customer');

// Products API functions

/**
 * Get Product By Id.
 * @param {Integer} id - Id of product to search on database
 * @returns {Object} Product - Result of query
 * @returns {String} notFound - Return not found if product with search id doesn't exist
 */
const getProductPDPById = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM products, category WHERE products.category = category.id AND _id='" + id + "'",
            function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const PRODUCT = results[0];
                    return resolve(PRODUCT);
                } else {
                    var notFound = 'notFound';
                    return resolve(notFound);
                }
            }
        );
    });
};

/**
 * Get All Products
 * @returns {Array} PRODUCTS - Array with all Products on database
 */
const getAllProducts = async () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM products, category WHERE products.category = category.id',
            function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const PRODUCTS = [];
                    results.forEach((product) => {
                        PRODUCTS.push({
                            id: product._id,
                            name: product.name,
                            price: product.preco,
                            category: product.descCat,
                            img: product.img,
                            desc: product.desc
                        });
                    });
                    return resolve(PRODUCTS);
                } else {
                    var notFound = 'notFound';
                    return resolve(notFound);
                }
            }
        );
    });
};

/**
 * Get Featured Products
 * @returns {Array} PRODUCTS - Array with all Featured Products on database
 */
const getFeaturedProducts = async () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM products, category WHERE products.category = category.id AND products.isFeatured = 1',
            function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const PRODUCTS = [];
                    results.forEach((product) => {
                        PRODUCTS.push({
                            id: product._id,
                            name: product.name,
                            price: product.preco,
                            category: product.descCat,
                            img: product.img
                        });
                    });
                    return resolve(PRODUCTS);
                } else {
                    var notFound = 'notFound';
                    return resolve(notFound);
                }
            }
        );
    });
};

// Customer API functions

/**
 * Get Customer Login
 * @returns {Object} customer - Customer info if login succeed
 * @returns {String} notFound - If customer login credentials are wrong
 */
const getCustomerLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT email FROM customer WHERE email='" + email + "'AND password = md5('" + password + "')",
            async function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const customer = await getCustomerInfo(email);
                    return resolve(customer);
                } else {
                    var notFound = 'notFound';
                    return resolve(notFound);
                }
            }
        );
    });
};

/**
 * Get Customer Info
 * @returns {Object} customer - All customer information
 * @returns {String} notFound - If customer doesn't exist
 */
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

/**
 * Check if Email exist on database
 * @returns {String} emailAlreadyRegistered - Email is already registered on database
 * @returns {String} notRegistered - Email is not registered on database
 */
const checkEmailExist = async (email) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT email from customer WHERE email = '" + email + "'", function (err, results, fields) {
            if (err) {
                return reject(err);
            }
            if (results && results.length > 0) {
                return resolve('emailAlreadyRegistered');
            } else {
                return resolve('notRegistered');
            }
        });
    });
};

/**
 * Register customer
 * @returns {String} customerInserted - Customer inserted to databse
 */
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
                return resolve('customerInserted');
            }
        );
    });
};

exports.checkEmailExist = checkEmailExist;
exports.getProductPDPById = getProductPDPById;
exports.getCustomerLogin = getCustomerLogin;
exports.getAllProducts = getAllProducts;
exports.getFeaturedProducts = getFeaturedProducts;
exports.registerCustomer = registerCustomer;
