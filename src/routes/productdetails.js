const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

/** Rendering Product by Param page */
router.get('/product', productController.getProductByParam());

module.exports = router;
