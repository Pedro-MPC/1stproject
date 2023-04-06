const decorators = require('./index');
const commerceAPI = require('../../../api/commerceAPI');

function Product() {
    this.id = decorators.setId;
    this.name = decorators.setName;
    this.img = decorators.setImg;
    this.price = decorators.setPrice;
    this.category = decorators.setCategory;
    this.desc = decorators.setDesc;
    this.isFeatured = decorators.setIsFeatured;
}

async function decoratedProduct(type, id) {
    const PRODUCT = await commerceAPI.getProductPDPById(id);
    if (PRODUCT != 'notFound') {
        const product = new Product();
        product.id(PRODUCT._id);
        product.name(PRODUCT.name);
        product.img(PRODUCT.img);
        product.price(PRODUCT.preco);
        product.category(PRODUCT.descCat);

        switch (type) {
            case 'pdp':
                product.desc(PRODUCT.desc);
                console.log('PRODUCT: ' + product);
                return product;
            case 'tile':
                return product;
        }
    } else {
        return 'Product not found';
    }
}

exports.Product = decoratedProduct;
