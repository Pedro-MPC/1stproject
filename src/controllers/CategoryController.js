const { isEmpty } = require('lodash');
const commerceAPI = require('../../api/commerceAPI');
const categoryModel = require('../models/category/category');

/**
 * Returns a middleware function to render the product detail page by Id on URL parameter.
 * @returns {Function} - Middleware function.
 */
var CID;
exports.ProductListByCategoryPage = () => {
    return async (req, res) => {
        const FULLURL = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        const PARAMS = FULLURL.searchParams;
        CID = PARAMS.get('cid');

        res.render('pages/categoryproducts', {
            CID: CID,
            pgTitle: 'P_COMMERCE',
            isLoggedIn: req.session.isLogged,
            customer: req.session.customer
        });
    };
};

exports.ProductListByCategory = () => {
    return async (req, res) => {
        const PRODUCTS = await categoryModel.Category(CID);
        console.log(PRODUCTS);
        if (!isEmpty(PRODUCTS.products)) {
            res.render('partials/products-lists/productList', {
                PRODUCTS: PRODUCTS
            });
        } else {
            res.render('partials/notFound', { msg: 'Ups... No products found.' });
        }
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
