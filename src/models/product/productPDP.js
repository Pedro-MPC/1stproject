const decorators = require('./index');

function ProductPDP() {
    this.id = decorators.setId;
    this.name = decorators.setName;
    this.img = decorators.setImg;
    this.price = decorators.setPrice;
    this.desc = decorators.setDesc;
    this.category = decorators.setCategory;
    this.online = decorators.setOnline;
}

module.exports = ProductPDP;
