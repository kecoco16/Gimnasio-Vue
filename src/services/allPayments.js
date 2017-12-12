import gimnasioService from './gimnasio'

const payments = {}

payments.search = async () => {
  const payments = await gimnasioService.get(`payments`, {})
  if (payments) {
    return payments.data
  } else {
    console.log(err => err)
  }
}

export default payments
