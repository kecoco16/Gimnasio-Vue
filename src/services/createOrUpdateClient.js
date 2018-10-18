import { post } from './utils'
import Swal from 'sweetalert2'

export const createOrUpdateClient = async payload => {
  try {
    const client = await post('createOrUpdateClient', payload)
    return client
  } catch (err) {
    return new Error(err)
  }
}

export const confirmModal = () => (
  Swal({
    title: '¿Esta seguro(a)?',
    text: 'Confirmar pago',
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
    title: 'Pago realizado con exito!',
    type: 'success',
    'timer': 1600,
    'showConfirmButton': false
  }).catch(Swal.noop)
)
