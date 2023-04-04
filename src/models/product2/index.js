const { Product } = require('./product');
const { ProductPDP } = require('./decorators/productPDP');
const { ProductTile } = require('./decorators/productTile');

module.exports.product = Product;
module.exports.productPDP = ProductPDP;
module.exports.productTile = ProductTile;
