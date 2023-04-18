const { connection } = require('../database/db-connect');

// Products API functions

/**
 * Get a product by ID
 * @async
 * @param {Integer} id - The ID of the product to get
 * @returns {<Object|string>} -The product object, or 'notFound' if the product with the given id doesnt exist
 */
const getProductById = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT products._id, products.online, products.desc, products.img, products.name, products.preco, GROUP_CONCAT(category.Id, category.descCat SEPARATOR ', ') AS category FROM products JOIN products_categories ON products._id = products_categories.id_product JOIN category ON products_categories.id_category = category.id WHERE products._id = '" +
                id +
                "'  GROUP BY products._id",
            function (err, results, fields) {
                if (err) {
                    return reject(err);
                }
                if (results && results.length > 0) {
                    const PRODUCT = results;
                    console.log('SUCESOOO');
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
 * Get all products
 * @async
 * @returns {<Array|String>} - An array of Product objects, or 'notFound' if no products were found.
 */
const getAllProducts = async () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT products._id, products.desc, products.img, products.isFeatured, products.name, products.preco, GROUP_CONCAT(category.Id, category.descCat SEPARATOR ",") AS category FROM products JOIN products_categories ON products._id = products_categories.id_product JOIN category ON products_categories.id_category = category.id GROUP BY products._id',
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

/**
 * Get all categories
 * @async
 * @returns {<Array|String>} - An array with all cateogories, or 'notFound' if no categories were found
 */
const getAllCategories = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM category', function (err, results, fields) {
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

// Customer API functions

/**
 * Get customer login information
 * @async
 * @param {string} email - The email address of the customer
 * @param {string} password - The password of the customer
 * @returns {<Object|string>} - The customer object, or 'notFound' if the customer login credentials were incorrect
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
                    console.log('logged');
                    return resolve(results);
                } else {
                    var notFound = 'notFound';
                    console.log(notFound);
                    return resolve(notFound);
                }
            }
        );
    });
};
/**
 * Get customer information
 * @async
 * @param {string} email - The email address of the customer
 * @returns {<Object|string>} - The customer object with the customer data, or 'notFound' if the customer was not found.
 */
const getCustomerInfo = async (email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT id, fname, lname, email FROM customer WHERE email='" + email + "'",
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
 * Checks if the email is already registered in the database.
 *
 * @param {string} email - The email to check.
 * @returns {<string>} - 'emailAlreadyRegistered' if the email is already registered, or 'notRegistered' if it is not registered.
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
 * Registers a new customer in the database.
 *
 * @param {string} email - The email of the new customer.
 * @param {string} password - The password of the new customer.
 * @param {string} fname - The first name of the new customer.
 * @param {string} lname - The last name of the new customer.
 * @returns {<string>} - 'customerInserted' if the customer is successfully inserted, or returns an error if there was an issue inserting the customer.
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

const updateCustomerDetails = async (id, fname, lname, email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "UPDATE customer SET email = '" +
                email +
                "', fname = '" +
                fname +
                "', lname= '" +
                lname +
                "' WHERE id = '" +
                id +
                "'",
            function (err) {
                if (err) throw err;
                return resolve('detailsUpdated');
            }
        );
    });
};

exports.checkEmailExist = checkEmailExist;
exports.getProductById = getProductById;
exports.getCustomerLogin = getCustomerLogin;
exports.getAllProducts = getAllProducts;
exports.registerCustomer = registerCustomer;
exports.getAllCategories = getAllCategories;
exports.updateCustomerDetails = updateCustomerDetails;
exports.getCustomerInfo = getCustomerInfo;
