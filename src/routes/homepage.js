const express = require('express');
const { toInteger, toString } = require('lodash');
const router = express.Router();
const commerceAPI = require('../../api/commerceAPI');
const msg = 'Produtos';
const title = 'Homepage - Projeto';

/** Rendering home page */
router
    .route('/')
    .get(function (req, res) {
        res.render('pages/index', { msg: msg, title: title });
    })

    .post(async (req, res, next) => {
        const PRODUCT = await commerceAPI.getProductById(req.body.msg);
        console.log('P-ID: ' + PRODUCT[0]._id);
        console.log('P-NAME: ' + PRODUCT[0].name);
        res.json({ response: PRODUCT });
    });

module.exports = router;
