const newProduct = require('../product');

const productPDP = function (product, desc, img) {
    this.product = product;
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.desc = desc;
    this.img = img;

    this.output = function () {
        console.log(
            'Decorated: ' + this.name + ', ' + this.price + ', ' + this.category + ', ' + this.desc + ', ' + this.img
        );
    };
};

module.exports = productPDP;
