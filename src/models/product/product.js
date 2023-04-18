const decorators = require('./index');

function Product() {
    this.id = decorators.setId;
    this.name = decorators.setName;
    this.img = decorators.setImg;
    this.price = decorators.setPrice;
    this.category = decorators.setCategory;
    this.desc = decorators.setDesc;
    this.online = decorators.setOnline;
}

module.exports = Product;
