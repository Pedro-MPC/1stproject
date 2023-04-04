const express = require('express');
const router = express.Router();
const hpController = require('../controllers/homepageController');
const productController = require('../controllers/ProductController');
const customer = require('../controllers/AccountController');

//router.get('*');
router.get(
    '/',
    customer.checkSession(),
    productController.getAllProductsPDP(),
    productController.getFeaturedProducts(),
    hpController.renderHome()
);
//router.post('/', hpController.getProductById());

module.exports = router;
