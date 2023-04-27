const loadCaroussel = require('./owlcaroussel-settings');
const loadAddToCartButtons = require('./cart');

function carousselAllProducts() {
    $.ajax({
        url: '/getallproducts',
        type: 'GET',
        success: function (data) {
            $('#carousselItems').html(data);
            loadCaroussel();
            loadAddToCartButtons();
            lazyLoad();
        }
    });
}

function featuredProducts() {
    $.ajax({
        url: '/getfeaturedproducts',
        type: 'GET',
        success: function (data) {
            $('#featuredProducts').html(data);
            lazyLoad();
        }
    });
}

function searchBarProduct() {
    if ($('#searchbar-input').val().trim() != '') {
        $.ajax({
            url: '/searchproduct',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                searchTerm: $('#searchbar-input').val().trim()
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('input[name=_csrf]').val());
            },
            success: function (data) {
                $('#search-results').html(data);
                lazyLoad();
            }
        });
    } else {
        $('#search-results').html(
            '                <p class="text-center lighter-text mt-4">Search by product name or id.</p>'
        );
    }
}

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

window.onload = function () {
    if (window.location.pathname === '/product') {
        lazyLoad();
    }
    if (window.location.pathname === '/') {
        carousselAllProducts();
        loadCaroussel();
        featuredProducts();
        lazyLoad();
    }
    // Search bar w/ Debounce function working :)
    const searchInput = document.querySelector('#searchbar-input'); // Get the Search bar
    const debouncedSearch = debounce(searchBarProduct, 300); // Call the Debouce function and send searchBarProduct() function and the timer as arguments
    searchInput.addEventListener('input', (event) => {
        // Event listener for input on the search bar
        debouncedSearch(event);
    });
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

module.exports = lazyLoad;
