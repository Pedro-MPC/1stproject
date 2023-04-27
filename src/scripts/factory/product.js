const commerceAPI = require('../../../api/commerceAPI');
const Product = require('@models/product/product');
const ProductTile = require('@models/product/productTile');
const ProductPDP = require('@models/product/productPDP');

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
        switch (type) {
            case 'pdp':
                var product = new ProductPDP();
                product.id(PRODUCT._id);
                product.name(PRODUCT.name);
                product.img(PRODUCT.img);
                product.price(PRODUCT.preco);
                var categories = PRODUCT.category.split(',');
                product.category(categories);
                product.online(PRODUCT.online);
                product.desc(PRODUCT.desc);
                console.log(product);
                return product;
            case 'tile':
                var product = new ProductTile();
                product.id(PRODUCT._id);
                product.name(PRODUCT.name);
                product.img(PRODUCT.img);
                product.price(PRODUCT.preco);
                product.online(PRODUCT.online);
                var categories = PRODUCT.category.split(',');
                product.category(categories);

                return product;
            case 'alltile':
                const AllProductsTile = [];
                PRODUCT.forEach((item) => {
                    const product = new ProductTile();
                    product.id(item._id);
                    product.name(item.name);
                    product.img(item.img);
                    var categories = item.category.split(',');
                    product.category(categories);
                    product.price(item.preco);
                    product.online(item.online);
                    AllProductsTile.push(product);
                });
                return AllProductsTile;
            case 'featuredtile':
                const FeaturedTile = [];
                PRODUCT.forEach((item) => {
                    if (item.isFeatured == 1) {
                        const product = new ProductTile();
                        product.id(item._id);
                        product.name(item.name);
                        product.img(item.img);
                        var categories = item.category.split(',');
                        product.category(categories);
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
