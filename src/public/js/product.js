const loadCaroussel = require('./owlcaroussel-settings');

function getAllProducts() {
    // make an AJAX request to the /update-cart route

    $.ajax({
        url: '/getallproducts',
        type: 'GET',
        success: function (data) {
            $('#carousselItems').html(data);
            loadCaroussel();
        }
    });
}
$(function () {
    getAllProducts();
});
