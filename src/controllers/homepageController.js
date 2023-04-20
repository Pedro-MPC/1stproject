const msg = 'Produtos';
const title = 'Homepage - Projeto';

/**
 * Render the homepage template with and sends the products, the customer and the login status
 * @returns {function} - An asynchronous function to handle the request and response
 */
exports.renderHome = () => {
    return async function (req, res, next) {
        const isLoggedIn = req.session.isLogged;
        if (req.session.cart) {
            CartSize = req.session.cart.length;
        } else {
            CartSize = 0;
        }
        res.render('pages/index-commerce', {
            msg: msg,
            title: title,
            isLoggedIn: isLoggedIn,
            customer: req.session.customer,
            pgTitle: 'P_COMMERCE - Home',
            CartItemsCount: res.locals.CartItemsCount,
            csrfToken: req.csrfToken()
        });
    };
};
