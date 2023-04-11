const express = require('express');
const router = express.Router();

// Require controller modules.
const accController = require('../controllers/AccountController');

/**
 * Route - Check if session exist on every request
 * @name get/*
 */

/**
 * Route - Check if session exist on every request
 * @param {function} accController.checkSession - check if session exist
 */
router.get('*', accController.checkSession());

/**
 * Route - Validate customer Login from the login/register modal
 * @param {function} accController.validateLogin - Validate customer Login
 */
router.post('/validateLogin', accController.validateLogin());

/**
 * Route - Register a customer from the login/register modal
 * @param {function} accController.checkEmailExist Check if email already exists on database before register
 * @param {function} accController.registerCustomer Register customer in database
 */
router.post('/registercustomer', accController.checkEmailExist(), accController.registerCustomer());

/**
 * Route - Register a customer from the login/register modal
 * @param {function} accController.logout Logout of customer account
 */
router.post('/logout', accController.logout());

module.exports = router;
