const loadAddToCartButtons = require('./cart');
const lazyLoad = require('./product');
// Get all categories
var categoriesLoaded = false;
function getCategories() {
    $.ajax({
        url: '/getcategories',
        method: 'GET',
        success: function (data) {
            $('#sidenav-items').html(data);
            categoriesLoaded = true;
            lazyLoad();
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
            lazyLoad();
        }
    });
}
$('.toggleSideNav').on('click', function (event) {
    if (!categoriesLoaded) {
        getCategories();
    }
});

$(function () {
    if (window.location.href.includes('/categories?cid=')) {
        ProductListByCategory();
        console.log('asd');
    }
});
