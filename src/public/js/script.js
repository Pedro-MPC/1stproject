import '../stylesheets/sassstyle.css';
import '../js/account';
import 'boxicons';

$(function () {
    function changeActive(e) {
        // Remove o seletor classe de todos item
        $('.owl-stage .owl-item').removeClass('ativo');
        setTimeout(function () {
            // Adiciona o seletor classe nos item da pagina ativa
            $('.owl-stage .active:first').addClass('ativo');
            $('.owl-stage .active:last').addClass('ativo');
        }, 0);
    }
    var owl = $('.owl-carousel');
    owl.on('initialized.owl.carousel', changeActive);
    owl.owlCarousel({
        nav: true,
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 1000,
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
                nav: true,
                loop: true
            }
        }
    });
});

$(function () {
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
});
