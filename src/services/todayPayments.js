import gimnasioService from './gimnasio'

const todayPayments = {}

todayPayments.search = () => gimnasioService.get(`todayPayments`, {})
  .then(res => res.data)
  .catch(err => err)

export default todayPayments
