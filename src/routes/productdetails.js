const express = require('express');
const router = express.Router();

// Require controller modules.
const productController = require('../controllers/ProductController');

/** Rendering Product by Param page */
router.get('/product', productController.ProductDetailPageByParam());

module.exports = router;
