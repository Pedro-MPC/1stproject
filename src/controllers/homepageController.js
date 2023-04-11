const msg = 'Produtos';
const title = 'Homepage - Projeto';

/**
 * Renders the Homepage
 */
exports.renderHome = () => {
    return async function (req, res, next) {
        const isLoggedIn = req.session.isLogged;
        const customer = req.session.customer;
        res.render('pages/index-commerce', {
            msg: msg,
            title: title,
            isLoggedIn: isLoggedIn,
            customer: customer,
            PRODUCTSPDP: res.locals.productsPDP,
            FEATUREDPRODUCTS: res.locals.featuredProdutos,
            CARTPRODUCTS: res.locals.cardProducts,
            pgTitle: 'P_COMMERCE - Home'
        });
    };
};
