const swal = require('./swal');

let btns = document.querySelectorAll('#addToCart');

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
                            title: 'Product ' + productId + ' added to cart!'
                        });
                    }

                    //alert("Searched ID: "+value+"\nProduct ID: "+res.response._id+"\nProduct Name: "+res.response.name)
                }
            });
        });
    });
});
