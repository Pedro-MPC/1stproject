const swal = require('./swal');

$(function () {
    $('#btnLoginModal').on('click', function (event) {
        $('#modalLogin').modal('show');
    });

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
                            title: 'Bem-vindo, ' + res.customer.profile[0].fname + '!'
                        });

                        setTimeout(() => {
                            location.reload();
                        }, '1500');
                    }
                }
            });
        }
    });
    $('#btnLogout').on('click', function (event) {
        event.preventDefault();

        $.ajax({
            url: '/logout',
            method: 'POST',
            contentType: 'application/json',

            success: function (res) {
                Toast.fire({
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
