const commerceAPI = require('../../api/commerceAPI');
const productFactory = require('../scripts/factory/product');
const categoryModel = require('../models/category/category');

/**
 * Returns a middleware function to render the product detail page by Id on URL parameter.
 * @returns {Function} - Middleware function.
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
            res.render('pages/product-pdp', {
                PRODUCT: PRODUCT,
                isLoggedIn: isLoggedIn,
                CARTPRODUCTS: res.locals.cardProducts,
                customer: customer
            });
        }
    };
};

/**
 * Returns a middleware function to get all products (PDP).
 * @returns {Function} - Middleware function.
 */
exports.getAllProductsCaroussel = () => {
    return async (req, res, next) => {
        const PRODUCTS = await productFactory.getProductFactory('alltile');

        res.render('partials/products-lists/productsCaroussel', { PRODUCTS: PRODUCTS });
    };
};

/**
 * Returns a middleware function to get all featured products.
 * @returns {Function} - Middleware function.
 */
exports.getFeaturedProductsHome = () => {
    return async (req, res, next) => {
        const PRODUCTS = await productFactory.getProductFactory('featuredtile');
        res.render('partials/products-lists/featuredProductsList', { PRODUCTS: PRODUCTS });
    };
};

/**
 * Returns a middleware function to get a product by ID (PDP).
 * @returns {Function} - The middleware function.
 */
exports.getPDPProductById = () => {
    return async (req, res, next) => {
        const PRODUCT = productModel.Product('pdp', req.body.id);
        return PRODUCT;
    };
};

/**
 * Returns a middleware function to get all categories.
 * @returns {Function} - The middleware function.
 */
exports.getallCategories = () => {
    return async (req, res, next) => {
        const CATEGORIES = await commerceAPI.getAllCategories();
        res.render('partials/categories/categories', { CATEGORIES: CATEGORIES });
    };
};
