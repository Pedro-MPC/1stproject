const express = require('express');
const router = express.Router();

// Require controller modules.
const productController = require('../controllers/ProductController');

/**
 * Route - Renders root '/product'
 * @param {function} productController.ProductDetailPageByParam - Render Product Detail Page
 */
router.get('/product', productController.ProductDetailPageByParam());

module.exports = router;
