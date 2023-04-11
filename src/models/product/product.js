const decorators = require('./index');

/**
 * Product with decorated properties
 * @Product
 */

function Product() {
    this.id = decorators.setId;
    this.name = decorators.setName;
    this.img = decorators.setImg;
    this.price = decorators.setPrice;
    this.category = decorators.setCategory;
    this.desc = decorators.setDesc;
    this.isFeatured = decorators.setIsFeatured;
}

module.exports = Product;
