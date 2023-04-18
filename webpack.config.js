const path = require('path');

module.exports = {
    entry: [
        './src/public/js/script.js',
        './src/public/js/product.js',
        './src/public/js/account.js',
        './src/public/js/category.js',
        './src/public/js/cart.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/public/js/')
    },
    watch: true
};
