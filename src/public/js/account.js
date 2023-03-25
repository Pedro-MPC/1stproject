const Swal = require('sweetalert2');

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

$(function () {
    console.log('ready!');
    $('#btnLoginModal').on('click', function (event) {
        $('#modalLogin').modal('show');
    });

    $('#loginForm').on('submit', function (event) {
        event.preventDefault();

        let email = $('#loginEmail').val();
        let password = $('#loginPassword').val();
        if (email == '' || password == '') {
            alert('Check your credentials');
        } else {
            $.ajax({
                url: '/validateLogin',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ email: email, password: password }),
                success: function (res) {
                    if (res.response == 'notFound') {
                        $('#searchProduct').html('Not logged in');
                    } else {
                        Toast.fire({
                            icon: 'success',
                            title: 'Bem-vindo, ' + res.fullname + '!'
                        });

                        setTimeout(() => {
                            location.reload();
                        }, '1000');
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
                    icon: 'success',
                    title: 'A terminar sessão...'
                });

                location.reload();
            }
        });
    });
});
