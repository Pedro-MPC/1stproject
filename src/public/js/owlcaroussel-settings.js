/**
 *@function
 *@description Owl Caroussel animations
 */

module.exports = function loadCaroussel() {
    function changeActive(e) {
        // Remove o seletor classe de todos item
        $('.owl-stage .owl-item').removeClass('ativo');
        setTimeout(function () {
            $('.owl-stage .active:first').addClass('ativo');
            $('.owl-stage .active:last').addClass('ativo');
        }, 0);
        console.log('as');
    }

    var owl = $('.owl-carousel');
    owl.on('initialized.owl.carousel', changeActive);

    owl.owlCarousel({
        nav: true,
        autoplayHoverPause: true,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 2300,
        lazyLoad: true,
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
                nav: true
            },
            1335: {
                items: 3,
                nav: true
            }
        }
    });
};
