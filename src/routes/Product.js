const express = require('express');
const router = express.Router();

// Require controller modules.
const productController = require('../controllers/ProductController');

/**
 * Route - Renders root '/product'
 * @param {function} productController.ProductDetailPageByParam - Render Product Detail Page
 * @param {function} productController.getallCategories - get all categories
 */
router.get('/getcategories', productController.getallCategories());
router.get('/getallproducts', productController.getAllProductsCaroussel());
router.get('/getfeaturedproducts', productController.getFeaturedProductsHome());
router.get('/product', productController.ProductDetailPageByParam());

module.exports = router;
