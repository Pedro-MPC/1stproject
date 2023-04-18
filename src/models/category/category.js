const commerceAPI = require('../../../api/commerceAPI');
const productFactory = require('../../scripts/factory/product');

/**
 * Category object.
 * @Category
 */
function CategoryModel(products) {
    this.products = products;
}

async function Category(id) {
    const PRODUCTS = await commerceAPI.getAllProducts();

    if (PRODUCTS != 'notFound') {
        const catProducts = [];

        for (const product of PRODUCTS) {
            if (product.category.match(/\d+/g).includes(id)) {
                const tileProduct = await productFactory.getProductFactory('tile', product._id);
                catProducts.push(tileProduct);
                console.log(catProducts);
            }
        }
        const CATEGORY = new CategoryModel(catProducts);
        return CATEGORY;
    }
}

exports.Category = Category;
