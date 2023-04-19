const Swal = require('sweetalert2');

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    confirmButtonColor: 'rgba(49, 64, 142, 1)',
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

const NormalSwal = Swal.mixin({
    icon: 'error',
    confirmButtonColor: 'rgba(49, 64, 142, 1)',
    confirmButtonText: 'OK'
});

exports.Toast = Toast;
exports.NormalSwal = NormalSwal;
