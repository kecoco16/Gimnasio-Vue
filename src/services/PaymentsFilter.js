import gimnasioService from './gimnasio'

const PaymentsFilter = {}

PaymentsFilter.search = (o, n) => gimnasioService.get(`PaymentByDate/${o}/${n}`, {})
  .then(res => res.data)
  .catch(err => err)

export default PaymentsFilter
