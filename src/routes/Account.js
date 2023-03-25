const express = require('express');
const router = express.Router();
const accController = require('../controllers/AccountController');

/** Account Routes */
router.post('/validateLogin', accController.validateLogin());
router.post('/logout', accController.logout());

module.exports = router;
