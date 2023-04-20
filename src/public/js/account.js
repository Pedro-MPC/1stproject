const swal = require('./swal');

function postUpdateDetails() {
    $('#save-details').on('submit', function (event) {
        event.preventDefault();
        let fname = $('#fname').val();
        let lname = $('#lname').val();
        let email = $('#email').val();
        if (email == '' || fname == '' || lname == '') {
            swal.NormalSwal.fire({
                title: 'Attention.',
                text: 'Please fill all fields.'
            });
        } else {
            $.ajax({
                url: '/save-details',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ fname: fname, lname: lname, email: email }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $('input[name=_csrf]').val());
                },
                success: function (res) {
                    swal.Toast.fire({
                        icon: 'success',
                        title: 'Update sucessfully!'
                    });
                }
            });
        }
    });
}
// AJAX customer login form
$('#loginForm').on('submit', function (event) {
    event.preventDefault();

    let email = $('#loginEmail').val();
    let password = $('#loginPassword').val();

    if (email == '' || password == '') {
        swal.NormalSwal.fire({
            title: 'Wrong Credentials.',
            text: 'Your email or password is incorrect.'
        });
    } else {
        $.ajax({
            url: '/validateLogin',
            method: 'POST',
            contentType: 'application/json',

            data: JSON.stringify({
                email: email,
                password: password
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('input[name=_csrf]').val());
            },
            success: function (res) {
                if (res.findFlag == false) {
                    swal.NormalSwal.fire({
                        icon: 'error',
                        title: 'Wrong Credentials.',
                        text: 'Your email or password is incorrect.'
                    });
                } else {
                    swal.Toast.fire({
                        icon: 'success',
                        title: 'Welcome, ' + res.customer.first_name + '!'
                    });
                    setTimeout(() => {
                        location.reload();
                    }, '1500');
                }
            }
        });
    }
});
// AJAX customer register form
$('#registerForm').on('submit', function (event) {
    event.preventDefault();

    let fname = $('#registerFName').val();
    let lname = $('#registerLName').val();
    let email = $('#registerEmail').val();
    let password = $('#registerPassword').val();

    if (email == '' || password == '' || fname == '' || lname == '') {
        swal.NormalSwal.fire({
            title: 'Atention!',
            text: 'Please fill out all fields.'
        });
    } else {
        $.ajax({
            url: '/registercustomer',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email, password: password, fname: fname, lname: lname }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('input[name=_csrf]').val());
            },
            success: function (res) {
                if (res.regSuccess) {
                    swal.Toast.fire({
                        icon: 'success',
                        title: '' + res.msg
                    });

                    setTimeout(() => {
                        location.reload();
                    }, '1500');
                } else {
                    swal.NormalSwal.fire({
                        title: 'Error!',
                        text: 'Email is already registered.'
                    });
                }
            }
        });
    }
});

// AJAX customer register form
function loadMyAccountPage() {
    $.ajax({
        url: '/my-account',
        method: 'GET',
        contentType: 'application/json',
        success: function (res) {}
    });
}

// AJAX customer register form
function loadAccountOrders() {
    $.ajax({
        url: '/my-account-orders',
        method: 'GET',
        contentType: 'application/json',
        success: function (res) {
            $('#account-details').html(res);
            $('#op-orders').addClass('op-active');
            $('#op-profile').removeClass('op-active');
        }
    });
}

// AJAX customer register form
$('#registerForm').on('click', function (event) {
    $.ajax({
        url: '/order-details-id',
        method: 'GET',
        contentType: 'application/json',
        success: function (res) {
            $('#detailsModal').html(res);
        }
    });
});

let isDetailsLoaded = false;

function loadAccountDetails() {
    $.ajax({
        url: '/my-account-details',
        method: 'GET',
        contentType: 'application/json',
        success: function (res) {
            $('#account-details').html(res);
            $('#op-profile').addClass('op-active');
            $('#op-orders').removeClass('op-active');
            isDetailsLoaded = true; // set the flag to true
        }
    });
}

$(function () {
    if (window.location.pathname === '/my-account') {
        loadMyAccountPage();

        // Check for hash change and call loadAccountDetails() if the hash is #details or loadAccountOrders() if the had is #orders
        $(window).on('hashchange', function () {
            if (window.location.hash === '#details') {
                loadAccountDetails();
            }
            if (window.location.hash === '#orders') {
                loadAccountOrders();
            }
        });
        if (window.location.hash === '#details') {
            loadAccountDetails();
        }
        if (window.location.hash === '#orders') {
            loadAccountOrders();
        }

        // Attach the event listener only if isDetailsLoaded is true
        $(document).on('submit', '#save-details', function (event) {
            event.preventDefault();
            if (!isDetailsLoaded) {
                return; // exit if isDetailsLoaded is false
            }
            let fname = $('#fname').val();
            let lname = $('#lname').val();
            let email = $('#email').val();
            if (email == '' || fname == '' || lname == '') {
                swal.NormalSwal.fire({
                    title: 'Attention.',
                    text: 'Please fill all fields.'
                });
            } else {
                $.ajax({
                    url: '/save-details',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ fname: fname, lname: lname, email: email }),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-CSRF-Token', $('input[name=_csrf]').val());
                    },
                    success: function (res) {
                        swal.Toast.fire({
                            icon: 'success',
                            title: 'Profile updated!'
                        });
                        $('#navabar-fname').html('Welcome, ' + res.customer_fname + '!');
                        $('#profile_fname').html('Hi, ' + res.customer_fname + '!');
                    }
                });
            }
        });

        // Logout button
        $('.btnLogout').on('click', function (event) {
            event.preventDefault();

            $.ajax({
                url: '/logout',
                method: 'POST',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $('input[name=_csrf]').val());
                },
                success: function (res) {
                    if (res.response == 'success') {
                        swal.Toast.fire({
                            icon: 'error',
                            title: 'Logging out...'
                        });

                        setTimeout(() => {
                            location.reload();
                        }, '1500');
                    }
                }
            });
        });
    }
});
