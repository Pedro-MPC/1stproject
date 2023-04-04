function Product(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
}
const newProduct = new Product(1, 'name', 'price', 'category');

console.log(newProduct);
module.exports = newProduct;
