const express = require('express');
const router = express.Router();
const commerceapi = require('../../api/commerceAPI');
const url = require('url');
const title = 'Products';

/** Rendering 404 page */
router.get('/products', async (req, res) => {
    var productName = '';
    var productId = '';
    var productImg = '';

    const FULLURL = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    const PARAMS = FULLURL.searchParams;
    const PID = PARAMS.get('pid');
    const PRODUCT = await commerceapi.getProductById(PID);
    productId = PRODUCT[0]._id;
    productName = PRODUCT[0].name;
    productDesc = PRODUCT[0].desc;

    productImg = PRODUCT[0].img;

    console.log(PRODUCT[0].name);
    res.render('pages/product', {
        productId: productId,
        productName: productName,
        productImg: productImg,
        productDesc: productDesc
    });
});

module.exports = router;
