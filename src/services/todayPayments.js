import gimnasioService from './gimnasio'

const todayPayments = {}

todayPayments.search = async () => {
  const todayPayment = await gimnasioService.get(`todayPayments`, {})
  if (todayPayment) {
    return todayPayment.data
  } else {
    console.log(err => err)
  }
}

export default todayPayments
