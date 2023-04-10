const swal = require('./swal');
import '../stylesheets/cartstyle.css';

let btns = document.querySelectorAll('#addToCart');

function updateCart() {
    // make an AJAX request to the /update-cart route
    $.ajax({
        url: '/update-cart',
        type: 'GET',
        success: function (data) {
            $('#productsListCart').html(data);
            $('totalCart').html(data.total);
        }
    });
}

$(function () {
    // AJAX customer login form
    btns.forEach(function (i) {
        i.addEventListener('click', function () {
            event.preventDefault();
            let productId = $(i).data('id');

            $.ajax({
                url: '/addtocart',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ productId: productId }),
                success: function (res) {
                    if (res.response == 'success') {
                        swal.Toast.fire({
                            icon: 'success',
                            position: 'top-start',
                            title: 'Product ' + productId + ' added to cart!'
                        });
                        updateCart();
                    }

                    //alert("Searched ID: "+value+"\nProduct ID: "+res.response._id+"\nProduct Name: "+res.response.name)
                }
            });
        });
    });

    updateCart();
});
