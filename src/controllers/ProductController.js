const commerceAPI = require('../../api/commerceAPI');
const productModel = require('../models/product/product');
var pjax = require('express-pjax');

// Get products with URL params
exports.getProductByParam = () => {
    return async (req, res) => {
        const FULLURL = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        const PARAMS = FULLURL.searchParams;
        const PID = PARAMS.get('pid');
        const PRODUCTPDP = await productModel.Product('pdp', PID);
        const customer = req.session.customer;
        const isLoggedIn = req.session.isLogged;

        if (PRODUCTPDP == 'notFound') {
            res.render('pages/404', { title: '404 - Product not Found' });
        } else {
            res.render('pages/product', {
                PRODUCTPDP: PRODUCTPDP,
                teste: 'teste',
                isLoggedIn: isLoggedIn,
                CARTPRODUCTS: res.locals.cardProducts,
                customer: customer
            });
        }
    };
};

// Get products info with Product Detail Page rules
exports.getAllProductsPDP = () => {
    return async (req, res, next) => {
        const PRODUCTSPDP = await commerceAPI.getAllProductsPDP();
        res.locals.productsPDP = PRODUCTSPDP;
        next();
    };
};

// Get featured Products
exports.getFeaturedProducts = () => {
    return async (req, res, next) => {
        const PRODUCTS = await commerceAPI.getFeaturedProducts();
        res.locals.featuredProdutos = PRODUCTS;
        next();
    };
};

// Get product PDP by Id (Used to render unique PDP)
exports.getProductById = () => {
    return async (req, res, next) => {
        const PRODUCT = productModel.Product('pdp', req.body.id);
        return PRODUCT;
    };
};

// Add Product to cart (in session)
exports.addToCart = () => {
    return async (req, res, next) => {
        const PID = req.body.productId;
        const PRODUCT = await productModel.Product('tile', PID);

        console.log(PRODUCT);

        if (!req.session.cart) {
            req.session.cart = [];
            console.log('cart created');
        }
        console.log(req.session.cart.length);

        if (req.session.cart.length > 0) {
            var flag = false;
            try {
                req.session.cart.forEach((product) => {
                    if (PRODUCT.id == product.PRODUCT.id) {
                        product.quantity++;
                        flag = true;
                        throw 'break';
                    }
                });
            } catch (err) {
                console.log('break');
                if (err !== 'break') throw err;
            }
            if (!flag) {
                console.log('FIrst entry of product');
                req.session.cart.push({ PRODUCT: PRODUCT, quantity: 1 });
            }
        } else if (req.session.cart.length == 0) {
            console.log('FIrst entry of product');
            req.session.cart.push({ PRODUCT: PRODUCT, quantity: 1 });
        }

        this.getCartProducts;

        res.json({ response: 'success', cart: req.session.cart });
    };
};

// Get products in cart
exports.getCartProducts = () => {
    return async (req, res, next) => {
        const CARDPRODUCTS = req.session.cart;
        console.log(CARDPRODUCTS);
        res.locals.cardProducts = CARDPRODUCTS;
        next();
    };
};
