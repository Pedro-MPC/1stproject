const swal = require('./swal');

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

function loadAddToCartButtons() {
    let btns = document.querySelectorAll('#addToCart');
    btns.forEach(function (i) {
        i.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            let productId = $(i).data('id');
            console.log('tried to add');
            $.ajax({
                url: '/addtocart',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ productId: productId }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $('#token').val());
                },
                success: function (res) {
                    if (res.response == 'success') {
                        swal.Toast.fire({
                            icon: 'success',
                            position: 'top-start',
                            title: 'Product ' + productId + ' added to cart!'
                        });
                        // Call updateCart() function to automatically update the Cart items without refreshing the page
                        updateCart();
                        console.log('asd');
                    }
                }
            });
        });
    });
}

$(function () {
    loadAddToCartButtons();
    updateCart();
});
module.exports = loadAddToCartButtons;
