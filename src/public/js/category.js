const loadAddToCartButtons = require('./cart');

// Get all categories
function getCategories() {
    $.ajax({
        url: '/getcategories',
        method: 'GET',
        success: function (data) {
            $('#sidenav-items').html(data);
        }
    });
}

// Get all categories
function ProductListByCategory() {
    $.ajax({
        url: '/getcategoryproducts',
        method: 'GET',
        success: function (data) {
            $('#productList').html(data);
            loadAddToCartButtons();
        }
    });
}
$(function () {
    getCategories();
    if (window.location.href.indexOf('http://localhost:3000/categories?cid=') === 0) {
        ProductListByCategory();
        console.log('asd');
    }
});
