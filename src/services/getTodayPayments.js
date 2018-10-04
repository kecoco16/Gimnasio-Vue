import { get } from './utils'

const getTodayPayments = async () => {
  try {
    const payments = await get(`getTodayPayments`, {})
    return payments
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}

export default getTodayPayments
