const express = require('express');
const router = express.Router();
const hpController = require('../controllers/homepageController');
const AccountController = require('../controllers/AccountController');

/** Old Homepage Routes */
router.get('/', hpController.renderHome());
router.post('/', hpController.getProductById());

module.exports = router;
