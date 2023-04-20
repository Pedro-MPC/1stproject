const express = require('express');
const router = express.Router();

const checkoutController = require('../controllers/CheckoutController');
const cartController = require('../controllers/CartController');

/**
 * Renders checkout page with GET request to '/checkout'
 * @param {function} cartController.checkout - render checkout page
 */
router.get('/checkout', checkoutController.renderCheckout());
router.get('/checkout-cart', cartController.getCartProductsCheckout());
router.post('/checkout-success', checkoutController.saveCheckout());

module.exports = router;
