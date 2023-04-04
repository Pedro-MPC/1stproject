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

        if (PRODUCT == 'notFound') {
            res.render('pages/404', { title: '404 - Product not Found' });
        } else {
            res.render('pages/product', {
                productId: productId,
                productName: productName,
                productImg: productImg,
                productDesc: productDesc
            });
        }
    };
};

exports.getAllProductsPDP = () => {
    return async (req, res, next) => {
        const PRODUCTSPDP = await commerceAPI.getAllProductsPDP();
        res.locals.productsPDP = PRODUCTSPDP;
        next();
    };
};

exports.getFeaturedProducts = () => {
    return async (req, res, next) => {
        const PRODUCTS = await commerceAPI.getFeaturedProducts();
        res.locals.featuredProdutos = PRODUCTS;
        next();
    };
};

exports.getProductById = () => {
    return async (req, res, next) => {
        const PRODUCT = await commerceAPI.getProductById(req.body.msg);
        console.log('P-ID: ' + PRODUCT[0]._id);
        console.log('P-NAME: ' + PRODUCT[0].name);
        res.json({ response: PRODUCT });
    };
};
