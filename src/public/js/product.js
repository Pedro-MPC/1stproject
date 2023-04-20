const loadCaroussel = require('./owlcaroussel-settings');
const loadAddToCartButtons = require('./cart');

function carousselAllProducts() {
    $.ajax({
        url: '/getallproducts',
        type: 'GET',
        success: function (data) {
            $('#carousselItems').html(data);
            loadCaroussel();
            loadAddToCartButtons();
        }
    });
}

function featuredProducts() {
    $.ajax({
        url: '/getfeaturedproducts',
        type: 'GET',
        success: function (data) {
            $('#featuredProducts').html(data);
        }
    });
}
$(function () {
    console.log('Acrousell');
    carousselAllProducts();
    loadCaroussel();
    featuredProducts();
});
