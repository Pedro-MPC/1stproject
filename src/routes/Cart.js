const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const hpController = require('../controllers/homepageController');

/** Rendering Product by Param page */

router.get('*', productController.getCartProducts());
router.post('/addtocart', productController.addToCart());

module.exports = router;
