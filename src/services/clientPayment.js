import { post } from './utils'
import Swal from 'sweetalert2'

export const clientPayment = async (
  amount,
  clientId,
  userId
) => {
  try {
    const payment = await post('createPayment', {
      amount,
      clientId,
      userId
    })
    return payment
  } catch (err) {
    console.log(err)
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
