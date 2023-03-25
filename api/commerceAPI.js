const { toInteger, toString } = require('lodash');
const { connection } = require('../database/db-connect');
require('../database/db-connect');

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

const getCustomerLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM customer WHERE email='" + email + "'AND password = '" + password + "'",
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

exports.getProductById = getProductById;
exports.getCustomerLogin = getCustomerLogin;
