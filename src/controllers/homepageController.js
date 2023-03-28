const commerceAPI = require('../../api/commerceAPI');
const msg = 'Produtos';
const title = 'Homepage - Projeto';
const session = require('express-session');

exports.renderHome = () => {
    return async function (req, res) {
        const isLoggedIn = req.session.isLogged;
        const userFullName = req.session.fullname;

        const PRODUCTS = await commerceAPI.getAllProducts();
        res.render('pages/index-commerce', {
            msg: msg,
            title: title,
            isLoggedIn: isLoggedIn,
            userFullName: userFullName,
            PRODUCTS: PRODUCTS,
            pgTitle: 'P_COMMERCE - Home'
        });
    };
};

exports.getProductById = () => {
    return async (req, res, next) => {
        const PRODUCT = await commerceAPI.getProductById(req.body.msg);
        console.log('P-ID: ' + PRODUCT[0]._id);
        console.log('P-NAME: ' + PRODUCT[0].name);
        res.json({ response: PRODUCT });
    };
};
