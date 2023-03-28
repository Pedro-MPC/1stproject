const express = require('express');
const router = express.Router();
const hpController = require('../controllers/homepageController');
const productController = require('../controllers/ProductController');

/** Old Homepage Routes */
router.get('/', hpController.renderHome());
router.post('/', hpController.getProductById());

module.exports = router;
