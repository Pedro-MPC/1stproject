const express = require('express');
const router = express.Router();
const hpController = require('../controllers/homepageController');
const productController = require('../controllers/ProductController');
const customer = require('../controllers/AccountController');

router.get(
    '/',
    customer.checkSession(),
    productController.getAllProducts(),
    productController.getFeaturedProducts(),
    hpController.renderHome()
);
//router.post('/', hpController.getProductById());

module.exports = router;
