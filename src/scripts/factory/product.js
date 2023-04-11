const { isArray } = require('lodash');
const commerceAPI = require('../../../api/commerceAPI');
const Product = require('@models/product/product');

/**
 * Returns a product object with product data.
 *
 * @async
 * @function getProductFactory
 * @param {string} type - The type of product output. Possible values: 'pdp', 'tile', 'allpdp'.
 * @param {number} [id] - The ID of the product. If not provided, retrieves all products.
 * @returns {(Object|Array<string>|string)} A Product Object if id provided, an array of Product objects if id not provided, or a String if not found.
 */
async function getProductFactory(type, id) {
    var PRODUCT;
    if (id === undefined) {
        PRODUCT = await commerceAPI.getAllProducts();
    } else {
        PRODUCT = await commerceAPI.getProductById(id);
    }
    if (PRODUCT != 'notFound') {
        const product = new Product();
        if (!isArray(PRODUCT)) {
            product.id(PRODUCT._id);
            product.name(PRODUCT.name);
            product.img(PRODUCT.img);
            product.price(PRODUCT.preco);
            product.category(PRODUCT.descCat);
        }
        switch (type) {
            case 'pdp':
                product.desc(PRODUCT.desc);
                return product;
            case 'tile':
                return product;
            case 'allpdp':
                const products = [];
                PRODUCT.forEach((item) => {
                    const product = new Product();
                    product.id(item._id);
                    product.name(item.name);
                    product.img(item.img);
                    product.price(item.preco);
                    product.category(item.descCat);
                    product.desc(item.desc);
                    products.push(product);
                });
                return products;
        }
    } else {
        return 'notFound';
    }
}

exports.getProductFactory = getProductFactory;
