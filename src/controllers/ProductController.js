const commerceAPI = require('../../api/commerceAPI');
const productModel = require('../models/product/product');

// Get products with URL params
exports.getProductByParam = () => {
    return async (req, res) => {
        const FULLURL = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        const PARAMS = FULLURL.searchParams;
        const PID = PARAMS.get('pid');
        const PRODUCTPDP = await productModel.Product('pdp', PID);
        const customer = req.session.customer;
        const isLoggedIn = req.session.isLogged;

        if (PRODUCTPDP == 'notFound') {
            res.render('pages/404', { title: '404 - Product not Found' });
        } else {
            res.render('pages/product', {
                PRODUCTPDP: PRODUCTPDP,
                isLoggedIn: isLoggedIn,
                CARTPRODUCTS: res.locals.cardProducts,
                customer: customer
            });
        }
    };
};

// Get products info with Product Detail Page rules
exports.getAllProductsPDP = () => {
    return async (req, res, next) => {
        const PRODUCTSPDP = await commerceAPI.getAllProductsPDP();
        res.locals.productsPDP = PRODUCTSPDP;
        next();
    };
};

// Get featured Products
exports.getFeaturedProducts = () => {
    return async (req, res, next) => {
        const PRODUCTS = await commerceAPI.getFeaturedProducts();
        res.locals.featuredProdutos = PRODUCTS;
        next();
    };
};

// Get product PDP by Id (Used to render unique PDP)
exports.getPDPProductById = () => {
    return async (req, res, next) => {
        const PRODUCT = productModel.Product('pdp', req.body.id);
        return PRODUCT;
    };
};
