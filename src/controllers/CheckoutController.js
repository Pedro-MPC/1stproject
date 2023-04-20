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
            const CHECKOUT = await commerceAPI.checkoutOrder(
                req.body.address,
                req.body.city,
                req.body.customer_fname,
                req.body.customer_lname,
                req.body.email,
                req.session.cart
            );
            if (CHECKOUT == 'success') {
                res.json({ response: 'success' });
            }
        } else {
            res.json({ response: 'noproductsoncart' });
        }
    };
};
