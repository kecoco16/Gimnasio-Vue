import Swal from 'sweetalert2'

export const loginError = () => (
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

export const getByNameError = name => (
  Swal({
    title: `😰`,
    text: `No hay coincidencias con ${name}.`,
    animation: false,
    customClass: 'animated tada',
    timer: 1600,
    showConfirmButton: false
  }).catch(Swal.noop)
)

export const requestError = () => (
  Swal({
    title: `😰`,
    text: `Hubo un problema de conexion, favor intenta de nuevo.`,
    animation: false,
    customClass: 'animated tada',
    timer: 2800,
    showConfirmButton: false
  }).catch(Swal.noop)
)
