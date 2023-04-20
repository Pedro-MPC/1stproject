const commerceAPI = require('../../api/commerceAPI');
/**
 * Customer logout. Destroy the logged user session.
 * @returns {String} [LOGOUTMSG] Logout message to client-side
 */
exports.renderCheckout = () => {
    return async (req, res, next) => {
        res.render('pages/checkout', {
            customer: req.session.customer,
            pgTitle: 'P_COMMERCE - Checkout',
            isLoggedIn: req.session.isLogged,
            csrfToken: req.csrfToken()
        });
    };
};

exports.saveCheckout = () => {
    return async (req, res, next) => {
        if (req.session.cart) {
            if (req.body.customer_fname) {
                fname = req.body.customer_fname;
            } else {
                fname = req.session.customer.first_name;
            }
            if (req.body.customer_lname) {
                lname = req.body.customer_lname;
            } else {
                lname = req.session.customer.last_name;
            }
            if (req.body.email) {
                email = req.body.email;
            } else {
                email = req.session.customer.email;
            }
            const CHECKOUT = await commerceAPI.checkoutOrder(
                req.body.address,
                req.body.city,
                fname,
                lname,
                email,
                req.session.cart
            );
            if (CHECKOUT == 'success') {
                delete req.session.cart;
                res.json({ response: 'success' });
            }
        } else {
            res.json({ response: 'noproductsoncart' });
        }
    };
};
