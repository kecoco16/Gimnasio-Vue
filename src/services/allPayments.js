import gimnasioService from './gimnasio'

const payments = {}

payments.search = () => gimnasioService.get(`payments`, {})
  .then(res => res.data)
  .catch(err => err)

export default payments
