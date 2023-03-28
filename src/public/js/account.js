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

const NormalSwal = Swal.mixin({
    icon: 'error',
    title: 'Oops...'
});

$(function () {
    $('#btnLoginModal').on('click', function (event) {
        $('#modalLogin').modal('show');
    });

    $('#loginForm').on('submit', function (event) {
        event.preventDefault();

        let email = $('#loginEmail').val();
        let password = $('#loginPassword').val();
        if (email == '' || password == '') {
            NormalSwal.fire({
                text: 'Check your credentials'
            });
        } else {
            $.ajax({
                url: '/validateLogin',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ email: email, password: password }),
                success: function (res) {
                    if (res.findFlag == false) {
                        NormalSwal.fire({
                            text: 'Check your credentials'
                        });
                    } else {
                        Toast.fire({
                            icon: 'success',
                            title: 'Bem-vindo, ' + res.profile.fname + ' ' + res.profile.lname + '!'
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
