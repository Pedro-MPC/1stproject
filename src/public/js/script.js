import '../stylesheets/sassstyle.css';
import '../js/account';
import 'boxicons';

$(function () {
    $('.owl-carousel').owlCarousel({
        nav: true,
        margin: 0,
        loop: true,
        autoplay: true,
        autoplayTimeout: 1520,
        smartSpeed: 1500,
        animateIn: 'linear',
        animateOut: 'linear',
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
