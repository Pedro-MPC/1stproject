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

    /**
     *@function
     *@description Owl Caroussel animations
     */

    /**
     *@function
     *@description Open login/register modal
     */
    $('.btnLoginModal').on('click', function (event) {
        $('#modalLogin').modal('show');
    });

    /**
     *@function
     *@description Toggle register/login forms on modal
     */
    $('#tglRegister').on('click', function (event) {
        $('#divLogin').css('display', 'none');
        $('#divRegister').css('display', 'block');
    });
    $('#tglLogin').on('click', function (event) {
        $('#divRegister').css('display', 'none');
        $('#divLogin').css('display', 'block');
    }); /*

    /*
    /**
     *@function
     *@description Search Product by Id on homepage
     */
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
});
