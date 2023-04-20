const express = require('express');
const router = express.Router();

// Require controller modules.
const cartController = require('../controllers/CartController');

/**
 * Add the product to Cart with POST request to '/addtocart'
 * @param {function} cartController.addToCart - add product to cart
 */
router.post('/addtocart', cartController.addToCart());

/**
 * Get all Cart Products with GET request to '/update-cart'
 * @param {function} cartController.getCartProducts - get Cart Products
 */
router.get('/update-cart', cartController.getCartProducts());

module.exports = router;
