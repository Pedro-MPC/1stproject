const commerceAPI = require('../../../api/commerceAPI');
const Product = require('@models/product/product');

/**
 * Product
 * @param {string} type - The type of Product output.
 * @param {Integer} id - The Id of the Product.
 * @returns {Object} product - Product object with product data
 */
async function getProductFactory(type, id) {
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
                break;
            case 'tile':
                break;
        }

        return product;
    } else {
        return 'notFound';
    }
}

exports.getProductFactory = getProductFactory;
