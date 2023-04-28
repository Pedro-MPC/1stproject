const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

function lazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const image = entry.target;
                const newURL = image.getAttribute('data-src');
                image.src = newURL;
                observer.unobserve(image);
            }
        });
    }, imageOptions);

    images.forEach((image) => {
        observer.observe(image);
    });
}
exports.lazyLoad = lazyLoad;
exports.debouce = debounce;

$(function () {
    const offCanvas = document.querySelector('#searchbar');
    const searchResults = document.querySelector('#search-results');

    function adjustOffCanvasHeight() {
        const headerHeight = offCanvas.querySelector('.offcanvas-header').offsetHeight;
        const resultsHeight = searchResults.offsetHeight;
        offCanvas.style.height = `${headerHeight}px`;
    }

    // Call the adjustOffCanvasHeight function initially to set the correct height
    adjustOffCanvasHeight();

    // Use the MutationObserver API to listen for changes in the content of the searchResults div and adjust the offCanvas height accordingly
    const observer = new MutationObserver(() => {
        adjustOffCanvasHeight();
    });

    observer.observe(searchResults, { childList: true, subtree: true });

    // Use the resize event to adjust the offCanvas height if the window size changes
    window.addEventListener('resize', () => {
        adjustOffCanvasHeight();
    });

    const loaderContainer = document.querySelector('.loader-container');
    document.body.className = 'hidden';
    window.addEventListener('load', () => {
        loaderContainer.style.opacity = '0';
        loaderContainer.style.display = 'none';
        document.body.className = 'visible';
    });

    // Open Login / Register modal
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
