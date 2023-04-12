const { toString } = require('lodash');

function getAllProducts() {
    // make an AJAX request to the /update-cart route
    $.ajax({
        url: '/getallproducts',
        type: 'GET',
        success: function (data) {
            $('#itemscaroussel').html(data);
        }
    });
}
$(function () {
    getAllProducts();
});
