import { get } from './utils'

const getPaymentsByDates = async (payload) => {
  const { minDate, maxDate } = payload
  try {
    const payments = await get(`getPaymentsByDates/${minDate}/${maxDate}`)
    return payments
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}

export default getPaymentsByDates
