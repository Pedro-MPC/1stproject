const decorators = require('./index');

function ProductTile() {
    this.id = decorators.setId;
    this.name = decorators.setName;
    this.img = decorators.setImg;
    this.price = decorators.setPrice;
    this.category = decorators.setCategory;
    this.online = decorators.setOnline;
}

module.exports = ProductTile;
