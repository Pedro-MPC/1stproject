const { Product } = require('../product');

class ProductPDP extends Product {
    constructor(id, name, price, age, desc, img) {
        super(id, name, price, age);
        this.desc = desc;
        this.img = img;
    }
    getProdPDP() {
        return this.desc, this.img, this.age, this.price, this.name;
    }
}
module.exports.ProductPDP = ProductPDP;
