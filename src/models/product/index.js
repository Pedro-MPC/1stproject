const { setCategory } = require('./decorators/category');
const { setDesc } = require('./decorators/desc');
const { setImg } = require('./decorators/img');
const { setName } = require('./decorators/name');
const { setPrice } = require('./decorators/price');
const { setId } = require('./decorators/id');
const { setIsFeatured } = require('./decorators/isFeatured');

exports.setCategory = setCategory;
exports.setDesc = setDesc;
exports.setImg = setImg;
exports.setName = setName;
exports.setPrice = setPrice;
exports.setId = setId;
exports.setIsFeatured = setIsFeatured;
