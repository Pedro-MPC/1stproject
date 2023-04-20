const express = require('express');
const router = express.Router();

// Require controller modules.
const hpController = require('../controllers/homepageController');
const accController = require('../controllers/AccountController');
const cartController = require('../controllers/CartController');

/**
 * Route - Renders root '/'
 * @param {function} hpController.renderHome - Render homepage
 */
router.get('/', accController.getCustomerDetails(), cartController.cartItemsCount(), hpController.renderHome());

module.exports = router;
