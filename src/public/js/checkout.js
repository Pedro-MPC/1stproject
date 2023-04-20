const swal = require('./swal');

function renderCheckoutPage() {
    // make an AJAX request to the /checkout route
    $.ajax({
        url: '/checkout-cart',
        type: 'GET',
        success: function (data) {
            $('#productsListCheckout').html(data);
        }
    });
}

// AJAX customer register form
$('#checkoutForm').on('submit', function (event) {
    event.preventDefault();

    let address = $('#address').val();
    let city = $('#city').val();
    let customer_fname = $('#fname').val();
    let customer_lname = $('#lname').val();
    let email = $('#email').val();

    if (email == '' || fname == '' || lname == '') {
        swal.NormalSwal.fire({
            title: 'Atention!',
            text: 'Please fill out all fields.'
        });
    } else {
        $.ajax({
            url: '/checkout-success',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                address: address,
                city: city,
                customer_fname: customer_fname,
                customer_lname: customer_lname,
                email: email
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('input[name=_csrf]').val());
            },
            success: function (res) {
                if (res.response == 'success') {
                    swal.NormalSwal.fire({
                        title: 'Success!',
                        text: 'Your order as been completed.',
                        icon: 'success'
                    });
                } else if (res.response == 'noproductsoncart') {
                    swal.NormalSwal.fire({
                        title: 'Error',
                        text: "You don't have any products on your cart.",
                        icon: 'error'
                    });
                }
            }
        });
    }
});

$(function () {
    renderCheckoutPage();
    console.log('Checkout page loaded.');
});
