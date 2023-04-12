const express = require('express');
const router = express.Router();

// Require controller modules.
const hpController = require('../controllers/homepageController');
const productController = require('../controllers/ProductController');

/**
 * Route - Renders root '/'
 * @param {function} productController.getAllProductsPDP - get all products
 * @param {function} productController.getFeaturedProducts - get featured products
 * @param {function} productController.getallCategories - get all categories
 * @param {function} hpController.renderHome - Render homepage
 */
router.get('/', productController.getFeaturedProducts(), hpController.renderHome());

module.exports = router;
