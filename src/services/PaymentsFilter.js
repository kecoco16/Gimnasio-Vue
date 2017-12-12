import gimnasioService from './gimnasio'

const PaymentsFilter = {}

PaymentsFilter.search = async (o, n) => {
  const filtrarPagos = await gimnasioService.get(`PaymentByDate/${o}/${n}`, {})
  if (filtrarPagos) {
    return filtrarPagos.data
  } else {
    console.log(err => err)
  }
}

export default PaymentsFilter
