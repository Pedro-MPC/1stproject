// Add Product to cart (in session)
const productFactory = require('../scripts/factory/product');

/**
 * Add Product to Cart.
 * @returns {string, object} response - Success message to the front-end JS | cart - User cart details saved on session.
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

        this.getCartProducts;

        res.json({ response: 'success', cart: req.session.cart });
    };
};

/**
 * Get the products in Cart and updates the cart on template in real-time
 * @returns {view} Partial view with the updated Cart items list
 */
exports.getCartProducts = () => {
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
