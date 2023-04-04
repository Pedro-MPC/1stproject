const swal = require('./swal');

$(function () {
    // Open login/register modal
    $('#btnLoginModal').on('click', function (event) {
        $('#modalLogin').modal('show');
    });

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
                data: JSON.stringify({ email: email, password: password }),
                success: function (res) {
                    if (res.findFlag == false) {
                        swal.NormalSwal.fire({
                            title: 'Wrong Credentials.',
                            text: 'Your email or password is incorrect.'
                        });
                    } else {
                        swal.Toast.fire({
                            icon: 'success',
                            title: 'Bem-vindo, ' + res.customer.profile.fname + '!'
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

    // Logout button
    $('#btnLogout').on('click', function (event) {
        event.preventDefault();

        $.ajax({
            url: '/logout',
            method: 'POST',
            contentType: 'application/json',

            success: function (res) {
                swal.Toast.fire({
                    icon: 'error',
                    title: 'A terminar sessão...'
                });

                setTimeout(() => {
                    location.reload();
                }, '1500');
            }
        });
    });
});
