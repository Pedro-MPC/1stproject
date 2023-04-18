/**
 *@function
 *@description Owl Caroussel animations
 */
function changeActive(e) {
    // Remove o seletor classe de todos item
    $('.owl-stage .owl-item').removeClass('ativo');
    setTimeout(function () {
        $('.owl-stage .active:first').addClass('ativo');
        $('.owl-stage .active:last').addClass('ativo');
    }, 0);
}

module.exports = function loadCaroussel() {
    var owl = $('.owl-carousel');
    $('.owl-carousel').owlCarousel('destroy');
    owl.on('initialized.owl.carousel', changeActive);
    owl.owlCarousel({
        onChanged: changeActive,
        onTranslate: changeActive,
        margin: 5,
        nav: true,
        autoplayHoverPause: true,
        autoplay: true,
        autoplaySpeed: 1000,
        rewind: true,
        lazyLoad: true,
        navText: ["<i class='bx bx-left-arrow-alt'></i>", "<i class='bx bx-right-arrow-alt' ></i>"],
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            900: {
                items: 2,
                nav: true
            },
            1000: {
                items: 3,
                nav: true
            }
        }
    });
};
