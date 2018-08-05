import Swal from 'sweetalert2'

export const loginError = async () => (
  Swal({
    type: 'error',
    title: 'Oops...',
    text: 'Usuario o contraseña incorrecta.',
    animation: false,
    customClass: 'animated tada',
    timer: 1600,
    showConfirmButton: false
  }).catch(Swal.noop)
)
