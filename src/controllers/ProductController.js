const commerceAPI = require('../../api/commerceAPI');
const productFactory = require('../scripts/factory/product');

/**
 * Get PDP Data with URL (PID) param
 * @param {Integer} PID - Product id retrieved from URL param.
 * @returns {view} Renders Product Detail Page view
 */
exports.ProductDetailPageByParam = () => {
    return async (req, res) => {
        const FULLURL = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        const PARAMS = FULLURL.searchParams;
        const PID = PARAMS.get('pid');
        const PRODUCT = await productFactory.getProductFactory('pdp', PID);
        const customer = req.session.customer;
        const isLoggedIn = req.session.isLogged;

        if (PRODUCT == 'notFound') {
            res.render('pages/404', { title: '404 - Product not Found' });
        } else {
            res.render('pages/product', {
                PRODUCT: PRODUCT,
                isLoggedIn: isLoggedIn,
                CARTPRODUCTS: res.locals.cardProducts,
                customer: customer
            });
        }
    };
};

/**
 * Get All Products (PDP)
 * @returns {Array} res.locals.productsPDP - Product List
 */
exports.getAllProductsPDP = () => {
    return async (req, res, next) => {
        const PRODUCTSPDP = await commerceAPI.getAllProducts();
        res.locals.productsPDP = PRODUCTSPDP;
        next();
    };
};

/**
 * Get Featured Products (PDP)
 * @returns {Array} res.locals.productsPDP - Featured Product List
 */
exports.getFeaturedProducts = () => {
    return async (req, res, next) => {
        const PRODUCTS = await commerceAPI.getFeaturedProducts();
        res.locals.featuredProdutos = PRODUCTS;
        next();
    };
};

/**
 * Get PDP By Id
 * @param {Integer} req.body.id - Product Id
 * @returns {Object} PRODUCT - Product
 */
exports.getPDPProductById = () => {
    return async (req, res, next) => {
        const PRODUCT = productModel.Product('pdp', req.body.id);
        return PRODUCT;
    };
};
