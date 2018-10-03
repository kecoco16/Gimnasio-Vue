import { post } from './utils'
import Swal from 'sweetalert2'

export const createOrUpdateUser = async payload => {
  try {
    const user = await post('createOrUpdateUser', payload)
    return user
  } catch (err) {
    return new Error(err)
  }
}

export const confirmModal = () => (
  Swal({
    title: '¿Esta seguro(a)?',
    text: 'Crear nuevo usuario',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#04498d',
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cancelar',
    allowOutsideClick: false
  }).catch(Swal.noop)
)

export const successModal = () => (
  Swal({
    title: 'Usuario creado con exito!',
    type: 'success',
    'timer': 1600,
    'showConfirmButton': false
  }).catch(Swal.noop)
)
