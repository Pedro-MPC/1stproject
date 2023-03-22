// CommerceAPI test build v0.1
const { toInteger } = require("lodash");
const { MongoClient } = require("mongodb");
const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);

const database = client.db('nodeProduct');
const products = database.collection('products');


const getProductById = async (id) => {
    const idint = toInteger(id)
    try {
        const query = { _id: idint };
        const product = await products.findOne({ _id: 1 });

        console.log("API: "+product.name);
        return product.name;

      } finally {
      }
  }

exports.getProductById = getProductById;