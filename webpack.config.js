const path = require('path');

module.exports = {
    entry: [
        './src/public/js/script.js',
        './src/public/js/product.js',
        './src/public/js/account.js',
        './src/public/js/category.js',
        './src/public/js/cart.js',
        './src/public/js/checkout.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/public/js/')
    },
    watch: true
};
/*
const path = require('path');

module.exports = {
    entry: {
        index: './src/public/js/script.js',
        product: './src/public/js/product.js',
        account: './src/public/js/account.js',
        category: './src/public/js/category.js',
        cart: './src/public/js/cart.js',
        checkout: './src/public/js/checkout.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './src/public/js/')
    },
    watch: true
};
*/
