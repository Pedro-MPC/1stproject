const express = require('express');
const router = express.Router();
const accController = require('../controllers/AccountController');

/** Account Routes */

/** Running on every request */
router.get('*', accController.checkSession(), accController.globalAccountVariables());
router.post('/validateLogin', accController.validateLogin());
router.post('/registercustomer', accController.checkEmailExist(), accController.registerCustomer());
router.post('/logout', accController.logout());

module.exports = router;
