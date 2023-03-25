const commerceAPI = require('../../api/commerceAPI');

exports.getProductByParam = () => {
    return async (req, res) => {
        var productName = '';
        var productId = '';
        var productImg = '';

        const FULLURL = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        const PARAMS = FULLURL.searchParams;
        const PID = PARAMS.get('pid');
        const PRODUCT = await commerceAPI.getProductById(PID);
        productId = PRODUCT[0]._id;
        productName = PRODUCT[0].name;
        productDesc = PRODUCT[0].desc;
        productImg = PRODUCT[0].img;

        console.log(PRODUCT[0]);

        res.render('pages/product', {
            productId: productId,
            productName: productName,
            productImg: productImg,
            productDesc: productDesc
        });
    };
};
