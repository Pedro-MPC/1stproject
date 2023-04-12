const swal = require('./swal');

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

$(function () {
    getCategories();
});
