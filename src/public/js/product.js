const loadCaroussel = require('./owlcaroussel-settings');
const loadAddToCartButtons = require('./cart');
const globalScripts = require('./script');

// Load Caroussel with all Products
function carousselAllProducts() {
    $.ajax({
        url: '/getallproducts',
        type: 'GET',
        success: function (data) {
            $('#carousselItems').html(data);
            loadCaroussel();
            loadAddToCartButtons();
            globalScripts.lazyLoad();
        }
    });
}

// Load partial with all Featured Products
function featuredProducts() {
    $.ajax({
        url: '/getfeaturedproducts',
        type: 'GET',
        success: function (data) {
            $('#featuredProducts').html(data);
            globalScripts.lazyLoad();
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
                globalScripts.lazyLoad();
            }
        });
    } else {
        $('#search-results').html(
            '                <p class="text-center lighter-text mt-4">Search by product name or id.</p>'
        );
    }
}

window.onload = function () {
    if (window.location.pathname === '/product') {
        globalScripts.lazyLoad();
    }
    if (window.location.pathname === '/') {
        carousselAllProducts();
        loadCaroussel();
        featuredProducts();
        globalScripts.lazyLoad();
    }
    // Search bar w/ Debounce function working :)
    const searchInput = document.querySelector('#searchbar-input'); // Get the Search bar
    const debouncedSearch = globalScripts.debouce(searchBarProduct, 300); // Call the Debouce function and send searchBarProduct() function and the timer as arguments
    searchInput.addEventListener('input', (event) => {
        // Event listener for input on the search bar
        debouncedSearch(event);
    });
};
