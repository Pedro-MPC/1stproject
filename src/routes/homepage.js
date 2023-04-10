const express = require('express');
const router = express.Router();
const hpController = require('../controllers/homepageController');
const productController = require('../controllers/ProductController');
const cartController = require('../controllers/CartController');

//router.get('*');

router.get(
    '/',
    productController.getAllProductsPDP(),
    productController.getFeaturedProducts(),
    hpController.renderHome()
);
//router.post('/', hpController.getProductById());

module.exports = router;
