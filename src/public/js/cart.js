const { forEach } = require('lodash');
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
                        var items = res.cart;
                        var html;
                        items.forEach((cart) => {
                            html =
                                '<li data-cart="true" class="clearfix isCart" style="max-height: 150px"> <img data-cart="true" src="' +
                                cart.PRODUCT.img +
                                '" alt="item1" class="mt-3 mr-2" style=" max-width: 75px; padding-right: 5px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; " /> <span data-cart="true" class="item-name" style="text-align: left" ><p style="white-space: nowrap; overflow: hidden; display: block; text-overflow: ellipsis">' +
                                cart.PRODUCT.name +
                                '</p></span > <span data-cart="true" class="item-quantity" style="float: left" >Quantity: ' +
                                cart.quantity +
                                '</span > <span data-cart="true" class="item-price" style="float: right" >' +
                                cart.PRODUCT.price +
                                '€</span > </li>';
                        });
                        $('#divTeste').append(html);
                    }

                    //alert("Searched ID: "+value+"\nProduct ID: "+res.response._id+"\nProduct Name: "+res.response.name)
                }
            });
        });
    });
});
