// Add Product to cart (in session)
const productFactory = require('../scripts/factory/product');

/**
 * Add Product to Cart.
 * @returns {Function} - Middleware function.
 */
exports.addToCart = () => {
    return async (req, res, next) => {
        const PID = req.body.productId;
        const PRODUCT = await productFactory.getProductFactory('tile', PID);

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

        res.json({ response: 'success', cart: req.session.cart });
    };
};

/**
 * Get Cart products.
 * @returns {Function} - Middleware function.
 */
exports.getCartProducts = () => {
    return async (req, res, next) => {
        const CARDPRODUCTS = req.session.cart;
        var Total = 0;
        var CartItem = [];
        var CartSize = 0;
        if (CARDPRODUCTS && CARDPRODUCTS.length > 0) {
            CARDPRODUCTS.forEach((cart) => {
                CartItem.push(cart);
                Total += cart.PRODUCT.price * cart.quantity;
                CartSize += cart.quantity;
            });

            req.session.cart.total = Total;

            res.render('partials/cart/cart-items', {
                CartItem: CartItem,
                Total: Total.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                CartSize: CartSize,
                empty: false
            });
        } else {
            res.render('partials/cart/cart-items', {
                empty: true,
                CartSize: CartSize,
                Total: 0
            });
        }
    };
};
/**
 * Count the number of items on the Cart.
 */
exports.cartItemsCount = () => {
    return async (req, res, next) => {
        if (req.session.cart) {
            const CARDPRODUCTS = req.session.cart;
            var count = 0;
            CARDPRODUCTS.forEach((product) => {
                count += product.quantity;
            });
            res.locals.CartItemsCount = count;
        }
        next();
    };
};

/**
 * Get Cart products to checkout.
 * Render the cart-items-checkout partial.
 */
exports.getCartProductsCheckout = () => {
    return async (req, res, next) => {
        const CARDPRODUCTS = req.session.cart;
        var Total = 0;
        var CartItem = [];
        var CartSize = 0;
        if (CARDPRODUCTS && CARDPRODUCTS.length > 0) {
            CARDPRODUCTS.forEach((cart) => {
                CartItem.push(cart);
                Total += cart.PRODUCT.price * cart.quantity;
                CartSize += cart.quantity;
            });

            req.session.cart.total = Total.toLocaleString('en-US', { minimumFractionDigits: 2 });

            res.render('partials/cart/cart-items-checkout', {
                CartItem: CartItem,
                Total: Total.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                CartSize: CartSize,
                empty: false
            });
        } else {
            res.render('partials/cart/cart-items-checkout', {
                empty: true,
                CartSize: CartSize,
                Total: 0
            });
        }
    };
};
