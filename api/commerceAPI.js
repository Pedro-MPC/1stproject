// CommerceAPI test build v0.1
const { toInteger } = require("lodash");
const { MongoClient } = require("mongodb");
const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);

const database = client.db('nodeProduct');
const products = database.collection('products');


const getProductById = async (id) => {
    const idd = toInteger(id)
    try {
        const query = { _id: idd };
        const product = await products.findOne({ _id: idd });
        console.log(product);
        
      } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
      }
  }

exports.getProductById = getProductById;