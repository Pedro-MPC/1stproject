const { Product } = require('../product');

class ProductTile extends Product {
    constructor(id, name, price, category, img) {
        super(id, name, price, category);
        this.img = img;
    }
    getProdPTile() {
        return { name: this.name, price: this.price, img: this.img };
    }
}
module.exports.ProductTile = ProductTile;
