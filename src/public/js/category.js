const loadAddToCartButtons = require('./cart');
const globalScripts = require('./script');
// Get all categories
var categoriesLoaded = false;
function getCategories() {
    $.ajax({
        url: '/getcategories',
        method: 'GET',
        success: function (data) {
            $('#sidenav-items').html(data);
            categoriesLoaded = true;
            globalScripts.lazyLoad();
        }
    });
}

// Get all products from a Category
function ProductListByCategory() {
    $.ajax({
        url: '/getcategoryproducts',
        method: 'GET',
        success: function (data) {
            $('#productList').html(data);
            loadAddToCartButtons();
            globalScripts.lazyLoad();
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
