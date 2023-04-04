const Product = require('../product');
const newProduct = require('../product');

const productPDP = function (product, desc, img) {
    this.product = product;
    this.desc = desc;
    this.img = img;
    //this.output = function () {
    //    console.log(
    //        'Decorated: ' + this.name + ', ' + this.price + ', ' + this.category + ', ' + this.desc + ', ' + this.img
    //    );
    //};
};

module.exports = productPDP;
