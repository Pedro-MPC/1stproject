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

function searchBarProduct() {
    console.log($('#searchbar-input').val());
    $.ajax({
        url: '/searchproduct',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            searchTerm: $('#searchbar-input').val()
        }),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('input[name=_csrf]').val());
        },
        success: function (data) {
            $('#search-results').html(data);
        }
    });
}
$(function () {
    console.log('Acrousell');
    carousselAllProducts();
    loadCaroussel();
    const input = document.querySelector('#searchbar-input');
    input.addEventListener('input', searchBarProduct);
    featuredProducts();
});
