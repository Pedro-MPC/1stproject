const setCategory = require('./decorators/category');
const setDesc = require('./decorators/desc');
const setImg = require('./decorators/img');
const setName = require('./decorators/name');
const setPrice = require('./decorators/price');
const setId = require('./decorators/id');
const setOnline = require('./decorators/online');

module.exports = {
    setId: setId,
    setName: setName,
    setImg: setImg,
    setPrice: setPrice,
    setCategory: setCategory,
    setDesc: setDesc,
    setOnline: setOnline
};
