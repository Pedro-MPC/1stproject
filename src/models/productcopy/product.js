const productPDP = require('./decorators/productPDP');

function Product(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
}
const baseProduct = new Product(1, 'nameA', 'priceA', 'categoryA');
const decoratedProduct = new productPDP(baseProduct, 'descriptionA', 'imageA');

console.log(decoratedProduct);

module.exports = Product;
