import { post } from './utils'
import Swal from 'sweetalert2'

export const createOrUpdateMembership = async payload => {
  try {
    const membership = await post('createOrUpdateMembership', payload)
    return membership
  } catch (err) {
    return new Error(err)
  }
}

export const confirmModal = () => (
  Swal({
    title: '¿Esta seguro(a)?',
    text: 'Crear nueva memsualidad',
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
