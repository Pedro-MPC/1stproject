const express = require('express');
const router = express.Router();
const accController = require('../controllers/AccountController');

/** Account Routes */
router.post('/validateLogin', accController.validateLogin());
router.post('/registercustomer', accController.checkEmailExist(), accController.registerCustomer());
router.post('/logout', accController.logout());

module.exports = router;
