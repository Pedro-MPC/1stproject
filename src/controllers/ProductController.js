const commerceAPI = require('../../api/commerceAPI');
const productFactory = require('../scripts/factory/product');
const searchModel = require('../models/search/searchModel');

/**
 * Renders the product detail page by Id on URL parameter.
 * @returns {View} -  Product-pdp view with product details.
 */
exports.ProductDetailPageByParam = () => {
    return async (req, res) => {
        const FULLURL = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        const PARAMS = FULLURL.searchParams;
        const PID = PARAMS.get('pid');
        const PRODUCT = await productFactory.getProductFactory('pdp', PID);
        const customer = req.session.customer;
        const isLoggedIn = req.session.isLogged;
        console.log(PRODUCT);

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
 * Get all products for Caroussel partial (alltile).
 * @returns {View} - Renders productCaroussel partial.
 */
exports.getAllProductsCaroussel = () => {
    return async (req, res, next) => {
        const PRODUCTS = await productFactory.getProductFactory('alltile');

        res.render('partials/products-lists/productsCaroussel', { PRODUCTS: PRODUCTS });
    };
};

/**
 * Returns a middleware function to get all featured products.
 * @returns {Function} - Renders featuredProductsList partial.
 */
exports.getFeaturedProductsHome = () => {
    return async (req, res, next) => {
        const PRODUCTS = await productFactory.getProductFactory('featuredtile');
        res.render('partials/products-lists/featuredProductsList', { PRODUCTS: PRODUCTS });
    };
};

/**
 * Search for a product with the nav-bar search bar.
 * @returns {Array} - Renders search-results partial with the search results.
 */
exports.searchBarProduct = () => {
    return async (req, res, next) => {
        const SEARCH = await searchModel.FindSearch(req.body.searchTerm);
        res.render('partials/navbar/search-results', { SEARCH: SEARCH, csrfToken: req.csrfToken() });
    };
};

/*
exports.getPDPProductById = () => {
    return async (req, res, next) => {
        const PRODUCT = productModel.Product('pdp', req.body.id);
        return PRODUCT;
    };
};
*/
