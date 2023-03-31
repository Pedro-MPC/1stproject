const msg = 'Produtos';
const title = 'Homepage - Projeto';

exports.renderHome = () => {
    return async function (req, res, next) {
        const isLoggedIn = req.session.isLogged;
        const customer = req.session.customer;

        res.render('pages/index-commerce', {
            msg: msg,
            title: title,
            isLoggedIn: isLoggedIn,
            customer: customer,
            PRODUCTS: res.locals.produtos,
            FEATUREDPRODUCTS: res.locals.featuredProdutos,
            pgTitle: 'P_COMMERCE - Home'
        });
    };
};
