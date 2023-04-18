const express = require('express');
const router = express.Router();

// Require controller modules.
const categoryController = require('../controllers/CategoryController');

/**
 * Route - Renders root '/product'
 * @param {function} productController.ProductDetailPageByParam - Render Product Detail Page
 * @param {function} productController.getallCategories - get all categories
 */
router.get('/categories', categoryController.ProductListByCategoryPage());
router.get('/getcategoryproducts', categoryController.ProductListByCategory());

module.exports = router;
