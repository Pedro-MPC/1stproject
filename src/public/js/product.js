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
        }
    });
}

function featuredProducts() {
    $.ajax({
        url: '/getfeaturedproducts',
        type: 'GET',
        success: function (data) {
            $('#featuredProducts').html(data);
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
            }
        });
    } else {
        $('#search-results').html('<p class="text-center lighter-text mt-1">Search by product name or id.</p>');
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
    console.log('Acrousell');
    if (window.location.pathname === '/') {
        carousselAllProducts();
        loadCaroussel();
        featuredProducts();
    }

    // Search bar w/ Debounce function working :)
    const searchInput = document.querySelector('#searchbar-input'); // Get the Search bar
    const debouncedSearch = debounce(searchBarProduct, 300); // Call the Debouce function and send searchBarProduct() function and the timer as arguments
    searchInput.addEventListener('input', (event) => {
        // Event listerner for input on the search bar
        debouncedSearch(event);
    });
};
