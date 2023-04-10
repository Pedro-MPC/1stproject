// Add Product to cart (in session)
const productModel = require('../models/product/product');
const ejs = require('ejs');

exports.addToCart = () => {
    return async (req, res, next) => {
        const PID = req.body.productId;
        const PRODUCT = await productModel.Product('tile', PID);

        if (!req.session.cart) {
            req.session.cart = [];
        }

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
                if (err !== 'break') throw err;
            }
            if (!flag) {
                req.session.cart.push({ PRODUCT: PRODUCT, quantity: 1 });
            }
        } else if (req.session.cart.length == 0) {
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
        res.locals.cardProducts = CARDPRODUCTS;
        next();
    };
};

exports.updateCartHTML = () => {
    return async (req, res, next) => {
        const CARDPRODUCTS = req.session.cart;
        var Total = 0;
        var CartItem = [];
        if (CARDPRODUCTS && CARDPRODUCTS.length > 0) {
            CARDPRODUCTS.forEach((cart) => {
                CartItem.push(cart);
                Total += cart.PRODUCT.price * cart.quantity;
            });
            req.session.cart.total = Total;
            res.render('partials/cart-items', {
                CartItem: CartItem,
                Total: Total,
                empty: false
            });
        } else {
            res.render('partials/cart-items', {
                empty: true,
                Total: 0
            });
        }
    };
};
