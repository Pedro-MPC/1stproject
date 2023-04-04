const newProduct = require('../product');

newProduct.desc = function (desc) {
    this.desc = desc;
};
newProduct.img = function (img) {
    this.img = img;
};

newProduct.desc('desc');
newProduct.img('img');

console.log(newProduct);
