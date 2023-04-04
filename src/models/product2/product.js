class Product {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

//decorator 1
const isPDP = (product, desc, img) => {
    return { ...product, desc: desc, img: img };
};

const isTile = (product, img) => {
    return { ...product, img: img };
};

const product = new Product(1, 'name', 23, 'cat');
console.log(product);

const tileProduct = isTile(product, 'img');
console.log(tileProduct);
