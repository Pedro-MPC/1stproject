const commerceAPI = require('../../../api/commerceAPI');
const Product = require('@models/product/product');
const decorators = require('../../models/product/index');

/**
 * Returns a product object with product data.
 *
 * @async
 * @function getProductFactory
 * @param {string} type - The type of product output. Possible values: 'pdp', 'tile', 'allpdp', 'featuredtile'.
 * @param {number} [id] - The ID of the product. If not provided, retrieves all products.
 * @returns {(Object|Array<string>|string)} A Product Object if id provided, an array of Product objects if id not provided, or a String if not found.
 */

async function getProductFactory(type, id) {
    var PRODUCT;
    if (id === undefined && (type == 'allpdp' || type == 'alltile' || type == 'featuredtile')) {
        PRODUCT = await commerceAPI.getAllProducts();
    } else {
        PRODUCT = await commerceAPI.getProductById(id);
    }

    if (PRODUCT != 'notFound') {
        var product = new Product();
        product.id(PRODUCT[0]._id);
        product.name(PRODUCT[0].name);
        product.img(PRODUCT[0].img);
        product.price(PRODUCT[0].preco);
        var categories = PRODUCT[0].category.split(',');
        product.category(categories);
        product.online(PRODUCT[0].online);
        switch (type) {
            case 'pdp':
                product.desc(PRODUCT[0].desc);
                return product;
            case 'tile':
                return product;
            case 'allpdp':
                const allProductsPDP = [];
                PRODUCT.forEach((item) => {
                    const product = new Product();
                    product.id(item._id);
                    product.name(item.name);
                    product.img(item.img);
                    product.price(item.preco);
                    var categories = item.category.split(',');
                    product.category(categories);
                    allProductsPDP.push(product);
                });
                return allProductsPDP;
            case 'alltile':
                const AllProductsTile = [];
                PRODUCT.forEach((item) => {
                    const product = new Product();
                    product.id(item._id);
                    product.name(item.name);
                    product.img(item.img);
                    var categories = item.category.split(',');
                    product.category(categories);
                    product.price(item.preco);
                    AllProductsTile.push(product);
                });
                return AllProductsTile;
            case 'featuredtile':
                const FeaturedTile = [];
                PRODUCT.forEach((item) => {
                    if (item.isFeatured == 1) {
                        const product = new Product();
                        product.id(item._id);
                        product.name(item.name);
                        product.img(item.img);
                        product.price(item.preco);
                        FeaturedTile.push(product);
                    }
                });
                return FeaturedTile;
        }
    } else {
        return 'notFound';
    }
}

exports.getProductFactory = getProductFactory;
