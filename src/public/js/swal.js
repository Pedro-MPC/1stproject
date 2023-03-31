const Swal = require('sweetalert2');

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    confirmButtonColor: '#dc3545',
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

const NormalSwal = Swal.mixin({
    icon: 'error',
    confirmButtonColor: '#c82333',
    confirmButtonText: 'OK'
});

exports.Toast = Toast;
exports.NormalSwal = NormalSwal;
