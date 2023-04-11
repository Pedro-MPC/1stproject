import 'boxicons';
$(function () {
    // Close cart popup when clicking outside the cart
    document.onclick = function (e) {
        if (e.target.id !== 'cart-toggle' && $(e.target).attr('data-cart') !== 'true') {
            //element clicked wasn't the div; hide the div
            $('.shopping-cart').css('display', 'none');
            $('#otherElements').removeClass('normal');
        }
    };
    // Transparency animation when opening/closing the Cart
    (function () {
        $('#cart').on('click', function () {
            $('.shopping-cart').fadeToggle('fast');
            $('#otherElements').toggleClass('normal');
        });
    })();

    // Owl Caroussel animations
    function changeActive(e) {
        // Remove o seletor classe de todos item
        $('.owl-stage .owl-item').removeClass('ativo');
        setTimeout(function () {
            $('.owl-stage .active:first').addClass('ativo');
            $('.owl-stage .active:last').addClass('ativo');
        }, 0);
    }
    var owl = $('.owl-carousel');
    owl.on('initialized.owl.carousel', changeActive);
    owl.owlCarousel({
        nav: true,
        autoplayHoverPause: true,
        margin: 20,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 2300,
        lazyLoad: true,
        animateIn: 'fadeOut',
        animateOut: 'fadeOut',
        onChanged: changeActive,
        onTranslate: changeActive,
        navText: ["<i class='bx bx-left-arrow-alt'></i>", "<i class='bx bx-right-arrow-alt' ></i>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            900: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: true
            }
        }
    });
    /*
    $('#form-insert').on('submit', function (event) {
        event.preventDefault();
        let value = $('#inputText').val();

        if (value != '') {
            $.ajax({
                url: '/account',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ msg: value }),
                success: function (res) {
                    if (res.response == 'notFound') {
                        $('#searchProduct').html('Product not found');
                    } else {
                        console.log;
                        $('#searchProduct').html(
                            'Searched : ' +
                                value +
                                '<br>ID: ' +
                                res.response[0]._id +
                                '<br>Name: ' +
                                res.response[0].name
                        );
                        console.log(res.response[0]);
                        //alert("Searched ID: "+value+"\nProduct ID: "+res.response._id+"\nProduct Name: "+res.response.name)
                    }
                }
            });
        }
    });
*/
    // Open login/register modal
    $('.btnLoginModal').on('click', function (event) {
        $('#modalLogin').modal('show');
    });

    // Toggle register/login forms on modal
    $('#tglRegister').on('click', function (event) {
        $('#divLogin').css('display', 'none');
        $('#divRegister').css('display', 'block');
    });
    $('#tglLogin').on('click', function (event) {
        $('#divRegister').css('display', 'none');
        $('#divLogin').css('display', 'block');
    });
});
