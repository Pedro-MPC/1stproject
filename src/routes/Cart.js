const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const hpController = require('../controllers/homepageController');

/** Rendering Product by Param page */

router.get('*', cartController.getCartProducts());
router.post('/addtocart', cartController.addToCart());
router.get('/update-cart', cartController.updateCartHTML());
module.exports = router;
