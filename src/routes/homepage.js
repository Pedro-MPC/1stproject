const express = require('express');
const router = express.Router();
const hpController = require('../controllers/homepageController');
const productController = require('../controllers/ProductController');

//router.get('*');

router.get(
    '/',
    productController.getAllProductsPDP(),
    productController.getFeaturedProducts(),
    productController.getCartProducts(),
    hpController.renderHome()
);
//router.post('/', hpController.getProductById());

module.exports = router;
