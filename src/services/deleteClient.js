import { post } from './utils'
import Swal from 'sweetalert2'

export const deleteClient = async id => {
  try {
    await post(`deleteClient`, { id })
  } catch (err) {
    return new Error(err)
  }
}

export const confirm = () => (
  Swal({
    title: '¿Esta seguro(a)?',
    text: 'Eliminar',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#04498d',
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cancelar',
    allowOutsideClick: false
  }).catch(Swal.noop)
)

export const success = () => (
  Swal({
    title: 'Cliente eliminado con exito!',
    type: 'success',
    'timer': 1600,
    'showConfirmButton': false
  }).catch(Swal.noop)
)
